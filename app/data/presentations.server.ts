import { Presentation as DBPresentation } from "@prisma/client";
import prisma from "./utils/prisma.server";
import { createVersion } from "./versions.server";

type Page = {
  id: string;
};
export interface Presentation
  extends Omit<DBPresentation, "createdAt" | "userId"> {
  pages: Page[];
}

const select = {
  id: true,
  title: true,
  description: true,
  updatedAt: true,
  pages: {
    select: {
      id: true,
    },
  },
};

export async function listPresentations(
  userId: string,
): Promise<Presentation[]> {
  if (!userId) return [];

  return prisma.presentation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select,
  });
}

export async function deletePresentation(
  userId: string,
  id: string,
): Promise<void> {
  const presentation = await prisma.presentation.findUnique({
    where: { id },
    select: {
      pages: {
        select: { id: true },
      },
    },
  });

  const pagesIds = (presentation?.pages ?? []).map(
    (page: { id: string }) => page.id,
  );

  const deleteContents = prisma.content.deleteMany({
    where: {
      pageId: {
        in: pagesIds,
      },
    },
  });

  const deletePages = prisma.page.deleteMany({
    where: {
      presentationId: id,
    },
  });

  const deleteVersions = prisma.version.deleteMany({
    where: { presentationId: id },
  });

  const deletePresentation = prisma.presentation.delete({
    where: { id, userId: userId },
  });

  await prisma.$transaction([
    deleteContents,
    deletePages,
    deleteVersions,
    deletePresentation,
  ]);
}

export async function createPresentation(
  userId: string,
  presentationParams: { title: string; description: string },
) {
  const presentation = await prisma.presentation.create({
    data: {
      ...presentationParams,
      user: { connect: { id: userId } },
      pages: {
        create: {},
      },
    },
    select,
  });

  await createVersion(presentation.id);

  return presentation;
}

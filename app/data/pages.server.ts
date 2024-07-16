import { Prisma } from "@prisma/client";
import prisma from "./utils/prisma.server";
import { createVersion } from "./versions.server";

export async function addPageToPresentation(presentationId: string) {
  const pagesCount = await prisma.page.count({
    where: { presentationId },
  });

  if (pagesCount >= 10) {
    throw new Error("Presentation already has 10 pages");
  }

  const page = await prisma.page.create({
    data: {
      presentationId,
    },
  });

  await createVersion(presentationId);
  return page;
}

export async function getPageContents(presentationId: string) {
  return prisma.version.findFirst({
    where: { presentationId },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deletePage(id: string) {
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) return;

  const deleteContents = prisma.content.deleteMany({
    where: { pageId: id },
  });

  const _deletePage = prisma.page.delete({ where: { id } });

  await prisma.$transaction([deleteContents, _deletePage]);

  await createVersion(page.presentationId);
}

export async function addContentToPage(
  pageId: string,
  contents: Prisma.ContentCreateInput["contents"],
) {
  const contentDetails = await prisma.content.create({
    data: {
      pageId,
      contents,
    },
    include: {
      page: {
        include: {
          presentation: true,
        },
      },
    },
  });

  await createVersion(contentDetails.page.presentationId);
  return contentDetails;
}

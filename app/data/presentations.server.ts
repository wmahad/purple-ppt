import { Presentation } from "@prisma/client";
import prisma from "./utils/prisma.server";

export async function listPresentations(
  userId: string,
): Promise<Presentation[]> {
  if (!userId) return [];

  return prisma.presentation.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });
}

export async function deletePresentation(
  userId: string,
  id: string,
): Promise<void> {
  await prisma.presentation.deleteMany({ where: { id, userId: userId } });
}

export async function deleteAllPresentations(userId: string): Promise<void> {
  await prisma.presentation.deleteMany({ where: { userId: userId } });
}

export async function createPresentation(
  userId: string,
  noteParams: { title: string },
) {
  return prisma.presentation.create({
    data: { ...noteParams, user: { connect: { id: userId } } },
  });
}

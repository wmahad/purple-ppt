import prisma from "./utils/prisma.server";

export async function createVersion(presentationId: string) {
  const presentation = await prisma.presentation.findUnique({
    where: { id: presentationId },
  });
  if (!presentation) return;

  const pages = await prisma.page.findMany({
    where: { presentationId: presentation.id },
    include: {
      contents: {
        select: {
          contents: true,
        },
      },
    },
  });

  const transformedPages = await Promise.all(
    pages.map(async (page) => {
      const latestContent = await prisma.content.findFirst({
        where: { pageId: page.id },
        orderBy: { createdAt: "desc" },
        select: { contents: true },
      });

      return {
        id: page.id,
        presentationId: page.presentationId,
        createdAt: page.createdAt,
        contents: latestContent?.contents ?? [],
      };
    }),
  );

  const versionData = {
    title: presentation.title,
    pages: transformedPages,
    presentationId: presentation.id,
  };

  await prisma.version.create({ data: versionData });
}

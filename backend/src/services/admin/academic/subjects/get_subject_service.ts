import prisma from "../../../../lib/prisma";

export const getSubjectsService = async (tab: string) => {
  return prisma.subject.findMany({
    where: {
      ...(tab === "ACTIVE" && {
        isArchived: false,
      }),

      ...(tab === "ARCHIVED" && {
        isArchived: true,
      }),
    },

    include: {
      faculty: {
        select: {
          id: true,
          name: true,
        },
      },

      sectionSubjects: {
        include: {
          section: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },

      exams: true,
    },

    orderBy: [
      {
        isArchived: "asc",
      },

      {
        updatedAt: "desc",
      },
    ],
  });
};

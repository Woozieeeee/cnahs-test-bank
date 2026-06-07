import prisma from "../../../lib/prisma";

export const getExamSectionsService = async (
  facultyId: number,
  subjectId: number,
) => {
  const sections = await prisma.sectionSubject.findMany({
    where: {
      subjectId,
    },

    select: {
      section: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      section: {
        name: "asc",
      },
    },
  });

  return sections.map((item) => item.section);
};

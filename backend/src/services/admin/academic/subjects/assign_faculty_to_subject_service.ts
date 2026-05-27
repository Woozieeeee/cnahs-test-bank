import prisma from "../../../../lib/prisma";

export const assignFacultyToSubjectService = async (
  subjectId: number,
  facultyId: number,
) => {
  return prisma.subject.update({
    where: {
      id: subjectId,
    },

    data: {
      facultyId,
    },
  });
};

import prisma from "../../../../lib/prisma";

export const assignFacultiesToSubjectService = async (
  subjectId: number,
  facultyIds: number[],
) => {
  // REMOVE OLD FACULTY POOL

  await prisma.subjectFaculty.deleteMany({
    where: {
      subjectId,
    },
  });

  // CREATE NEW FACULTY POOL

  return prisma.subjectFaculty.createMany({
    data: facultyIds.map((facultyId) => ({
      subjectId,
      facultyId,
    })),
  });
};

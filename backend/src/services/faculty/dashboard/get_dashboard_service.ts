import prisma from "../../../lib/prisma";

export const getDashboardService = async (facultyId: number) => {
  const subjects = await prisma.subject.findMany({
    where: {
      faculties: {
        some: {
          facultyId,
        },
      },
    },

    include: {
      questions: true,

      exams: true,

      sectionSubjects: {
        include: {
          section: {
            include: {
              users: {
                where: {
                  role: "STUDENT",
                },
              },
            },
          },
        },
      },
    },
  });

  const totalSubjects = subjects.length;

  const totalQuestions = subjects.reduce(
    (sum, subject) => sum + subject.questions.length,
    0,
  );

  const totalExams = subjects.reduce(
    (sum, subject) => sum + subject.exams.length,
    0,
  );

  const sectionIds = new Set<number>();

  const studentIds = new Set<number>();

  subjects.forEach((subject) => {
    subject.sectionSubjects.forEach((sectionSubject) => {
      sectionIds.add(sectionSubject.section.id);

      sectionSubject.section.users.forEach((student) => {
        studentIds.add(student.id);
      });
    });
  });

  const upcomingExams = subjects.flatMap((subject) =>
    subject.exams.map((exam) => ({
      id: exam.id,

      title: exam.title,

      subject: subject.name,

      difficulty: exam.difficulty,

      scheduledAt: exam.startsAt,
    })),
  );

  return {
    assignedSubjects: totalSubjects,

    totalSections: sectionIds.size,

    totalStudents: studentIds.size,

    totalQuestions,

    totalAssessments: totalExams,

    subjects: subjects.map((subject) => ({
      id: subject.id,

      code: subject.code,

      name: subject.name,

      sections: subject.sectionSubjects.length,

      students: subject.sectionSubjects.reduce(
        (sum, sectionSubject) => sum + sectionSubject.section.users.length,
        0,
      ),

      questions: subject.questions.length,

      assessments: subject.exams.length,
    })),

    upcomingExams,
  };
};

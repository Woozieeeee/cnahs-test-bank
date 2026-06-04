import prisma from "../../../lib/prisma";

export const getSubjectByIdService = async (
  facultyId: number,
  subjectId: number,
) => {
  const subject = await prisma.subject.findFirst({
    where: {
      id: subjectId,

      faculties: {
        some: {
          facultyId,
        },
      },
    },

    include: {
      questions: {
        include: {
          topic: true,
        },
      },

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

  if (!subject) {
    throw new Error("Subject not found");
  }

  const topicIds = new Set<number>();

  subject.questions.forEach((question) => {
    if (question.topicId) {
      topicIds.add(question.topicId);
    }
  });

  const studentIds = new Set<number>();

  subject.sectionSubjects.forEach((sectionSubject) => {
    sectionSubject.section.users.forEach((student) => {
      studentIds.add(student.id);
    });
  });

  return {
    id: subject.id,

    code: subject.code,

    name: subject.name,

    description: subject.description,

    totalTopics: topicIds.size,

    totalQuestions: subject.questions.length,

    totalAssessments: subject.exams.length,

    totalSections: subject.sectionSubjects.length,

    totalStudents: studentIds.size,
  };
};

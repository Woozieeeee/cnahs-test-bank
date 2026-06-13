import prisma from "../../../lib/prisma";
import { getTopicDependencies } from "../../../utils/topic_dependency_checker";

export const archiveTopicService = async (
  facultyId: number,
  topicId: number,
) => {
  const topic = await prisma.topic.findFirst({
    where: {
      id: topicId,

      subject: {
        faculties: {
          some: {
            facultyId,
          },
        },
      },
    },
  });

  if (!topic) {
    throw new Error("Topic not found");
  }

  const dependencies = await getTopicDependencies(topicId);

  if (dependencies.questionCount > 0 || dependencies.exams.length > 0) {
    const error: any = new Error("Topic has active dependencies");

    error.dependencies = dependencies;

    throw error;
  }

  const archivedTopic = await prisma.topic.update({
    where: {
      id: topicId,
    },

    data: {
      isArchived: true,
    },
    include: {
      questions: true,
    },
  });

  return {
    id: archivedTopic.id,
    name: archivedTopic.name,
    description: archivedTopic.description,
    totalQuestions: archivedTopic.questions.length,
    isArchived: archivedTopic.isArchived,
  };
};

import { slugify } from "./slug";

export const subjectRoute = (id: number, name: string) =>
  `/faculty/subjects/${id}-${slugify(name)}`;

export const topicRoute = (
  subjectId: number,
  subjectName: string,
  topicId: number,
  topicName: string
) =>
  `/faculty/subjects/${subjectId}-${slugify(
    subjectName
  )}/topics/${topicId}-${slugify(topicName)}`;

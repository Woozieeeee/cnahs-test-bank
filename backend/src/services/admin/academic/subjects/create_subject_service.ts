import prisma from "../../../../lib/prisma";

interface Props {
  name: string;
  code: string;
  description?: string;
}

// Generate slug from name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Remove multiple consecutive hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

export const createSubjectService = async ({
  name,
  code,
  description,
}: Props) => {
  const existingSubject = await prisma.subject.findUnique({
    where: {
      code,
    },
  });

  if (existingSubject) {
    throw new Error("Subject code already exists.");
  }

  // Generate slug and ensure uniqueness
  let slug = generateSlug(name);
  let counter = 1;
  let uniqueSlug = slug;

  while (await prisma.subject.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return prisma.subject.create({
    data: {
      name,
      code,
      description,
      slug: uniqueSlug,
    },
  });
};

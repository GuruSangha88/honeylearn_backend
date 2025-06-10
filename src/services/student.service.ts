import prisma from "../prisma/client";
import { ApiError } from "../utils/ApiError";

export const addStudent = async ({
  parentId,
  firstName,
  lastName,
  birthday,
  avatarUrl,
  ageGroup,
}: {
  parentId: number;
  firstName: string;
  lastName: string;
  birthday: string; // ISO string
  avatarUrl?: string;
  ageGroup: "GROUP_5_6" | "GROUP_7_9" | "GROUP_10_12";
}) => {
  // Optionally, check if parent exists
  const parent = await prisma.user.findUnique({ where: { id: parentId } });
  if (!parent) throw new ApiError("Parent not found", 404);

  const student = await prisma.student.create({
    data: {
      parentId,
      firstName,
      lastName,
      birthday: new Date(birthday),
      avatarUrl,
      ageGroup,
    },
  });
  return student;
};

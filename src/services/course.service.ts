// src/services/course.service.ts
import prisma from "../prisma/client";

export const getCourseDetails = async (courseId: number) => {
  return prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        include: {
          lessons: {
            include: {
              sections: true,
            },
          },
        },
      },
    },
  });
};

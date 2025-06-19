// src/services/lession.service.ts
import prisma from "../prisma/client";

// single lesson detail
export const getLessonById = async (lessonId: number) => {
  return prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: {
        select: {
          id: true,
          courseId: true,
        },
      },
      sections: {
        include: {
          contents: {
            orderBy: {
              id: 'asc',
            },
          },
        },
      },
    },
  });
};

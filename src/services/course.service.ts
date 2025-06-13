// src/services/course.service.ts
import prisma from "../prisma/client";

interface FormattedLesson {
  id: number;
  title: string;
  description?: string;
  duration?: number;
  completed?: boolean;
  // Add other properties if needed
}

// Single course detail
export const getCourseDetails = async (courseId: number) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        include: {
          lessons: {
            include: {
              sections: {
                include: {
                  contents: true,
                },
              },
            },
            orderBy: {
              orderNumber: 'asc',
            },
          },
        },
      },
    },
  });

  if (!course) return null;

  return formatCourse(course);
};

// All courses
export const getAllCourseDetails = async () => {
  const courses = await prisma.course.findMany({
    include: {
      modules: {
        include: {
          lessons: {
            include: {
              sections: {
                include: {
                  contents: true,
                },
              },
            },
            orderBy: {
              orderNumber: 'asc',
            },
          },
        },
      },
    },
  });

  return courses.map(formatCourse);
};

// 👇 Formatter to match your desired JSON shape
function formatCourse(course: any) {
  const allLessons = course.modules.flatMap((module: { lessons: any[] }) => module.lessons);

  const formattedLessons = allLessons.map((lesson: any, index: number) => {
    const nextLesson = allLessons[index + 1];

    return {
      id: lesson.id.toString(),
      topicId: course.id.toString(),
      title: lesson.title,
      description: lesson.description,
      duration: lesson.duration || 0,
      completed: lesson.completed || false,
      nextLessonId: nextLesson?.id?.toString() || null,
      sections: lesson.sections.map((section: any) => ({
        id: section.id.toString(),
        title: section.title,
        audioUrl: section.audioUrl || "",
        completed: section.completed || false,
        durationInSeconds: section.durationInSeconds || 0,
        content: section.contents.map((content: any) => ({
          id: content.id.toString(),
          type: content.type,
          timing: content.timing,
          data: content.data,
        })),
      })),
    };
  });

  const completedLessons = formattedLessons.filter((l:any) => l.completed).length;

  return {
    id: course.id.toString(),
    title: course.title,
    description: course.description || "",
    content: course.content || "",
    imageUrl: course.imageUrl || "",
    totalLessons: formattedLessons.length,
    completedLessons,
    lessons: formattedLessons,
  };
}

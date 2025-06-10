// src/validations/studentSchema.ts
import { z } from "zod";

export const createStudentSchema = z.object({
  firstName: z.string({
    required_error: "First name is required",
    invalid_type_error: "First name must be a string"
  }).min(1, "First name is required"),
  lastName: z.string({
    required_error: "Last name is required",
    invalid_type_error: "Last name must be a string"
  }).min(1, "Last name is required"),
  birthday: z.string({
    required_error: "Birthday is required",
    invalid_type_error: "Birthday must be a string"
  })
    .min(1, "Birthday is required")
    .refine((date) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(date)) return false;
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, {
      message: "Birthday must be a valid date in YYYY-MM-DD format",
      path: ["birthday"]
    }),
  avatarUrl: z.string().url().optional(),
  ageGroup: z.enum(["GROUP_5_6", "GROUP_7_9", "GROUP_10_12"], {
    required_error: "Age group is required",
    invalid_type_error: "Age group must be one of: GROUP_5_6, GROUP_7_9, GROUP_10_12"
  }),
});
export type StudentSchema = z.infer<typeof createStudentSchema>;

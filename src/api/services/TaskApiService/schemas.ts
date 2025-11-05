import { TaskPriority, TaskStatus } from 'types/task';
import { z } from 'zod';

export const CreateTaskSchema = z.object({
  title: z.string().min(1, 'add.validation.titleRequired').min(3, 'add.validation.titleMin'),
  description: z
    .string()
    .min(1, 'add.validation.descriptionRequired')
    .min(5, 'add.validation.descriptionMin'),
  deadline: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const today = new Date().toISOString().split('T')[0] as string;
        return val >= today;
      },
      { message: 'add.validation.deadlinePast' },
    ),
  priority: z.enum(Object.values(TaskPriority)),
  status: z.enum(Object.values(TaskStatus)),
  tags: z.array(z.string()).optional(),
});

export const UpdateTaskSchema = z.strictObject({}).extend(CreateTaskSchema.shape).partial();

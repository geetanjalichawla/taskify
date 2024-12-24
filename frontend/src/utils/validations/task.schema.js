import * as z from "zod"

export const taskSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    due_date: z.string().min(1, 'Due date is required'),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    status: z.enum(['PENDING', 'COMPLETED'])
  });
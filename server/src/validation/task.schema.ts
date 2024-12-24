import { z } from 'zod';
import { IInputTask } from '../types/task.type';

export const PriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH'], { errorMap: () => ({ message: "Priority must be 'LOW', 'MEDIUM' or 'HIGH'." }) });
export const StatusEnum = z.enum(['PENDING', 'COMPLETED'], { errorMap: () => ({ message: "Status must be 'PENDING' or 'COMPLETED'." }) });

export const TaskInputSchema = z.object({
    title: z.string({ required_error: "Title is required." }).min(1, { message: "Title is required." }).max(255, { message: "Title must not exceed 255 characters." }),
    description: z.string({ required_error: "Description is required." }).max(500, { message: "Description must not exceed 500 characters." }).optional(),
    due_date: z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    }, z.date({ required_error: "Due date is required." })),
    priority: PriorityEnum.default('LOW'),
    status: StatusEnum.default('PENDING'),
});

export const TaskUpdateSchema = z.object({
    title: z.string().min(1, { message: "Title is required." }).max(255, { message: "Title must not exceed 255 characters." }),
    description: z.string().max(500, { message: "Description must not exceed 500 characters." }).optional(),
    due_date: z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    }, z.date({ required_error: "Due date is required." })),
    priority: PriorityEnum.default('LOW'),
    status: StatusEnum.default('PENDING'),
});

export const TaskIdSchema = z.number().positive("Invalid ID");

import { Request, Response } from 'express';
import {
    createTaskService,
    getTasksService,
    getTaskByIdService,
    updateTaskService,
    deleteTaskService,
} from '../services/task.service';
import { catchAsync } from '../utils/catch-async.utils';
import { TaskInputSchema, TaskUpdateSchema, TaskIdSchema } from '../validation/task.schema';
import { IInputTask } from '../types/task.type';
import { StatusCodes } from 'http-status-codes';

export const createTask = catchAsync(async (req: Request, res: Response) => {
    const validatedData = TaskInputSchema.parse(req.body);
    const task = await createTaskService(validatedData as IInputTask);
    res.status(StatusCodes.CREATED).json({
        message: 'Task created successfully',
        task
    });
});

export const getTasks = catchAsync(async (req: Request, res: Response) => {
    const { status, priority } = req.query;
    const tasks = await getTasksService({
        status: status ? String(status) : undefined,
        priority: priority ? String(priority) : undefined
    });
    res.status(StatusCodes.OK).json({
        message: 'Tasks fetched successfully',
        data: tasks
    });
});

export const getTaskById = catchAsync(async (req: Request, res: Response) => {
    const validatedId = TaskIdSchema.parse(parseInt(req.params.id));
    const task = await getTaskByIdService(validatedId);
    task ? res.status(StatusCodes.OK).json({
        message: 'Task fetched successfully',
        data: task
    }) : res.status(StatusCodes.NOT_FOUND).json({ error: 'Task not found' });
});

export const updateTask = catchAsync(async (req: Request, res: Response) => {
    const validatedId = TaskIdSchema.parse(parseInt(req.params.id));
    const validatedData = TaskUpdateSchema.parse(req.body);

    await getTaskByIdService(validatedId);

    const updatedTask = await updateTaskService(validatedId, validatedData as IInputTask);
    res.status(StatusCodes.OK).json({
        message: 'Task updated successfully',
        data: updatedTask
    });
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
    const validatedId = TaskIdSchema.parse(parseInt(req.params.id));
    await getTaskByIdService(validatedId);
    await deleteTaskService(validatedId);
    res.status(StatusCodes.OK).json({ message: 'Task deleted successfully' });
});

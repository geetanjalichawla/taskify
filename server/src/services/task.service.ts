import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { prisma } from '../config/db.config';
import { IInputTask } from '../types/task.type';
import CustomError from '../utils/custom-error.utils';


export const createTaskService = async (data : IInputTask) => {
    try {
        return await prisma.task.create({ data });
    } catch (error) {
        throw new CustomError(ReasonPhrases.INTERNAL_SERVER_ERROR,StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

export const getTasksService = async (filters: any) => {
    try {
        return await prisma.task.findMany({ where: filters , orderBy: { createdAt: 'desc' } });
    } catch (error) {
        throw new CustomError(ReasonPhrases.INTERNAL_SERVER_ERROR,StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

export const getTaskByIdService = async (id: number) => {
    if(!id)throw new CustomError(ReasonPhrases.NOT_FOUND,StatusCodes.NOT_FOUND);
    let task;
    try {
       task= await prisma.task.findUnique({ where: { id } });
    } catch (error) {
        throw new CustomError(ReasonPhrases.INTERNAL_SERVER_ERROR,StatusCodes.INTERNAL_SERVER_ERROR);
    }

    if(!task)throw new CustomError("Task " + ReasonPhrases.NOT_FOUND,StatusCodes.NOT_FOUND);
    return task;

};

export const updateTaskService = async (id: number, data: IInputTask) => {
    if(!id)throw new CustomError(ReasonPhrases.NOT_FOUND,StatusCodes.NOT_FOUND);

    try {
        return await prisma.task.update({ where: { id }, data });
    } catch (error) {
        throw new CustomError(ReasonPhrases.INTERNAL_SERVER_ERROR,StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

export const deleteTaskService = async (id: number) => {
    if(!id)throw new CustomError(ReasonPhrases.NOT_FOUND,StatusCodes.NOT_FOUND);
    try {
        return await prisma.task.delete({ where: { id } });
    } catch (error) {
        throw new CustomError(ReasonPhrases.INTERNAL_SERVER_ERROR,StatusCodes.INTERNAL_SERVER_ERROR);

    }
};
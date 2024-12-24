import { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

export const errorMiddleware = (
    err: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
): void => {  

    if (err instanceof ZodError) {
         res.status(400).json({
            error: err.errors[0].message,
        });
    }

    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message|| ReasonPhrases.INTERNAL_SERVER_ERROR });
};

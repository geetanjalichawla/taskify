// catch async errors
export const catchAsync = (fn: Function) => {
    return (req: any, res: any, next: any) => {
        fn(req, res, next).catch(next);
    };
}
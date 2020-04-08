import { NextFunction, Request, Response } from 'express';

export const authenticateRoutesExcept = (whiteList: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (whiteList.find(x => req.url.startsWith(x))) {
        return next();
    }

    if (req.isAuthenticated()) {
        return next();
    }

    res.status(401);
    res.json({ message: 'Unauthorized' });
};

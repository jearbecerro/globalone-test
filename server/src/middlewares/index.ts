import express from 'express';
import { verifyUserSessionToken } from 'helpers';
import { merge } from 'lodash';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction ) => {
    try {
        const { sessionToken } = req.body;
        
        if(!sessionToken){
            return res.sendStatus(403);
        }

        const user = verifyUserSessionToken(sessionToken);
        
        merge(req, user);
        return next();
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}


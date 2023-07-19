import express from 'express';
import { verifyUserSessionToken } from '../helpers';
import { merge } from 'lodash';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction ) => {
    try {
        const authHeader = req.headers['authorization']
        const sessionToken = authHeader && authHeader.split(' ')[1]
        
        if(sessionToken===null){
            return res.sendStatus(401);
        }

        const user: any = verifyUserSessionToken(sessionToken);
        if(user==="invalid token"){
            return res.sendStatus(403);
        }
        
        const userJSON = JSON.parse(user.data);
        merge(req, userJSON);
        
        return next();
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}


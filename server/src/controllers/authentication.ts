import express from 'express';
import bcrypt from 'bcrypt';

import { getUserByEmail, createUser } from '../db/users';
import { createUserSessionToken } from '../helpers';


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.sendStatus(400);
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if(!correctPassword){
            return res.status(400).json({ message: "incorrect password" });
        }

        const expireseIn = "8h";
        const authToken = createUserSessionToken(user, expireseIn);

        return res.status(200).json({ authToken: authToken })
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username, name } = req.body;

        if (!email || !password || !username || !name) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "email is already use" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = await createUser({
            email,
            username,
            name,
            password: hashPassword
        });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
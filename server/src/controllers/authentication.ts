import express from 'express';
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import { createUser, getUserByEmail } from 'db/users';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400);
        }

        const user = await getUserByEmail(email);
        if(!user){
            return res.sendStatus(400);
        }

        //compare password to hash and save password
        const correctPassword = compareSync(password, user.password);
        if(!correctPassword){
            return res.sendStatus(202).json({ message: "incorrect password" });
        }


    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username, name } = req.body;

        if (!email || !password || !username || !name) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(202).json({ message: "email is not available" });
        }

        const salt = genSaltSync(10);
        const hashPassword = hashSync(password, salt);
        const user = await createUser({
            email,
            username,
            name,
            password: hashPassword
        });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}
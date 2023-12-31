import express from "express";
import { deleteUserById, getUserById, getUsers, updateUserById } from "../db/users";

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.body
        const users = await getUserById(id);
        return res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
};

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const values = req.body;

        const user = await updateUserById(id, values);

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}
import express from "express";

import { getBooksById, saveBooks, deleteBooksById } from "../db/books";

export const getSaveBooks = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const saveBooks = await getBooksById(id);
        return res.sendStatus(200).json(saveBooks);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
};

export const saveBook = async (req: express.Request, res: express.Response) => {
    try {
        const { values } = req.body;
        const save = await saveBooks(values);

        return res.json(saveBooks);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}

export const deleteBook = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteBooksById(id);

        return res.json(deletedUser);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}
import express from 'express';
import { load } from 'ts-dotenv';
import axios from 'axios';

const env = load({
    NY_TIMES_API_KEY: String,
});

const baseURL = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?";
const NY_TIMES_API_KEY = env.NY_TIMES_API_KEY;

export const searchBook = async ( req: express.Request, res: express.Response ) =>{
    try {
        const { searchBy, value } = req.body;
        //const headerConfig = { "headers": { "Accept": "application/json" } };
        await axios.get(`${baseURL}${searchBy}=${value}&api-key=${NY_TIMES_API_KEY}`)
        .then(r=>{
            const data = r.data;
            console.log(data)
            return res.status(200).json(data).end();
        }).catch(e=>{
            return res.sendStatus(400);
        })

    } catch (error) {
        console.log(error.message)
        return res.sendStatus(400);
    }
}
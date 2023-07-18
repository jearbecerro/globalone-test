import express from 'express';
import { genSaltSync, hashSync } from "bcrypt-ts";
import { createUser, getUserByEmail } from 'db/users';

export const register = async (req: express.Request, res: express.Response) => {
    try {
      const { email, password, username } = req.body;
  
      if (!email || !password || !username) {
        return res.sendStatus(400);
      }
  
      const existingUser = await getUserByEmail(email);
    
      if (existingUser) {
        return res.sendStatus(400);
      }
  
      const salt = 10;
      const user = await createUser({
        email,
        username,
        
      });
  
      return res.status(200).json(user).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
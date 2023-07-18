import express from 'express';

import { getAllUsers, deleteUser, updateUser, getUser } from '../controllers/users';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
  router.get('/users/:id', isAuthenticated, getUser);
  router.delete('/users/:id', isAuthenticated, deleteUser);
  router.patch('/users/:id', isAuthenticated, updateUser);
};
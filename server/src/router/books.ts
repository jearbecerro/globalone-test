import express from 'express';

import { isAuthenticated } from '../middlewares';
import { deleteBook, getSaveBooks, saveBook } from '../controllers/books';

export default (router: express.Router) => {
  router.get('/books/:id', isAuthenticated, getSaveBooks);
  router.delete('/books/:id', isAuthenticated, deleteBook);
  router.post('/save-books', isAuthenticated, saveBook);
};
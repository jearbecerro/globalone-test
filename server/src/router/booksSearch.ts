import express from 'express';

import { isAuthenticated } from '../middlewares';
import { searchBook } from '../controllers/books-search';


export default (router: express.Router) => {
  router.post('/search-books', isAuthenticated, searchBook);
};
import express from 'express';

import users from './users';
import books from './books';
import authentication from './authentication';
import booksSearch from './booksSearch';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    books(router);
    booksSearch(router);
    return router;
};
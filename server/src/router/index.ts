import express from 'express';

import users from './users';
import books from './books';
import authentication from './authentication';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    books(router);
    return router;
};
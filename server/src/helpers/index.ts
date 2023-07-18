import * as jwt from 'jsonwebtoken';
import { load } from 'ts-dotenv';

const env = load({
    SECRET_TOKEN: String,
});

const SECRET_TOKEN = env.SECRET_TOKEN;

export const createUserSessionToken = (user: Object, expiresIn: string) => {
    const strUser: string = JSON.stringify(user);
    const authToken = jwt.sign({
        data: strUser
    }, SECRET_TOKEN, { expiresIn: expiresIn });
    return authToken;
}

export const verifyUserSessionToken = (token: string)=>{
    const decodedToken = jwt.verify(token, SECRET_TOKEN);
    return decodedToken;
}
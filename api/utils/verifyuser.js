import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
export const verifyuser = async (req, res,next) =>
{
    const token=req.cookies.token;
    if(!token)
    {
        return next(errorHandler(401, 'Unauthorized not token found'));
    }
    jwt.verify(token,"abc123",(err,user)=>
    {
        if(err)
        {
            return next(errorHandler(401, 'Unauthorized'));
        }
        req.user=user;
        next();
    })

}
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.SECRET_KEY;

const verifyToken = (req,res,next)=>{
    
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ error: 'Token is missing' });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Invalid token format' });
    }
    if (!secretKey) {
      return res.status(500).json({ error: "Server configuration error" });
    }

    jsonwebtoken.verify(token,secretKey,(err,decoded)=>{
        if(err){
            console.error(err);
            return res.status(401).json({'error':'token is invalid'});
        }
        // Make sure that _id is present in the decoded payload
        if (!decoded._id) {
            return res.status(401).json({ error: 'Invalid token payload' });
        }

        // Add decoded user information to req.user
        req.user = decoded;

        next();
    });
}

export default verifyToken;
import jwt from 'jsonwebtoken';

const authMiddleware =  (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    
      const token = authHeader.split(' ')[1];
      try{
        const decoded =  jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
      }
      catch(error){
res.status(400).json({
    message: "user does not have access"
})
      }
}
export { authMiddleware };
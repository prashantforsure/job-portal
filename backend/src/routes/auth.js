import express from "express"
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';
const prisma = new PrismaClient();
const router = express.Router();

router.post("/register", async (req,res) => {
    const { email, password, role }  = req.body;
    const hashpassword = bcrypt(password,10);
    try{
        const user = await  prisma.user.create({
            data: {
                email,
                password: hashpassword,
                role
            }
        })
        res.status(200).json({
            message: "user has been created"
        })
    } catch(error){
res.status(400).json({
    message: "user has not been created"
}
)
    }
})

router.post('/login', async (req,res) => {
    const {email, password} = req.body
    try{
        const user = await prisma.user.findFirst({
            where: {
email
            }
        })
        if(!user || !( await bcrypt.compare(password, user.password))){
            res.status(201).json({
message: "wrong credentails"
            }
            )
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
          });
      
          res.json({ token });
    }
    catch(error){
        res.status(400).json({
            message: "something went wrong, please try again"
        })

    }
})
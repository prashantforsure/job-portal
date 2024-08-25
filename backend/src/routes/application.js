import express, { application } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/authMiddleware';

const prisma = new PrismaClient();
const router = express.Router();


router.post("/", authMiddleware, async (req,res) => {
    const { jobId, coverLetter} = req.body;
    const userId = req.user.userId

    try{
        const application = await prisma.application.create({
            data: {
                jobId,
                coverLetter,
                userId
            }
        })
        res.status(200).json({
            message: "application has been submitted"
        }, application)
    }catch{
        res.status(400).json({
            message: "something went wrong"
        })
    }
})

router.get("/", authMiddleware, async (req, res) => {
    const application = await prisma.application.findMany()
    res.json(application)
})

router.get("/:id", async(req, res) => {
    const { id } = req.params
    const application = await prisma.application.findUnique({
        where: {
            id: Number(id)
        }
    })
    res.status(200).json({
        message: "success"
    }, application)
})

router.update("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params
    const { jobId, coverLetter} = req.body;

    try{
        const update = await prisma.application.update({
            where: {
                id: Number(id)
            }, data: {
                jobId,
                coverLetter
            }
        })
        res.status(200).json({
            message: "succesfully updated"
         }, update)
    } catch(error){
        res.status(200).json({
            message: "something went wrong"
         })
    }
})

export default router;
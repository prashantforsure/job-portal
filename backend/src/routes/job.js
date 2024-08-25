import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/authMiddleware';

const prisma = new PrismaClient();
const router = express.Router();


router.post('/', authMiddleware, async (req, res) =>{
    const { title, description, company, location, salary } = req.body;
    const userId = req.user.userId;
    try{
    const job = await prisma.job.create({
        data: {
            title,
            description,
            salary,
            location,
            company,
            userId
        }
    })
    res.status(200).json({
        message: "job has been posted"
    })
}catch(error){
    res.status(400).json({
        message: "something went wrong"
    })
}
})

router.get("/", authMiddleware, async (req, res) => {
    try{
const jobs = await prisma.job.findMany();
res.json(jobs);
    }catch(error){
        res.status(400).json({
            message: "cant get the jobs"
        })
    }
})

router.get("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const job = await prisma.job.findUnique({
        where: {
            id : Number(id)
        }
    })
    if(!job){
        res.json({
            message: "no job available"
        })
    }
    res.json(job)
})

router.update("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { title, description, company, location, salary } = req.body;
try{
const update = await prisma.job.update({
    where: {
        id : Number(id)
    }, data: {
        title,
        description,
        location,
        salary,
        company
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

router.delete("/:id", authMiddleware, async(req, res) => {
    const { id } = req.params;
    try{
        const deletejob = await prisma.job.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json({
            message: "the job has been deleted"
        })
    }catch(error){
        res.json({
            message: "something went wrong"
        })
    }
})

export default router;
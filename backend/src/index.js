import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import jobRoutes from './routes/job';
import applicationRoutes from './routes/application';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

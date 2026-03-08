import express from 'express'
import jobroutes from './routes/job.js';
import dotenv from 'dotenv'
import { connectkafka } from './producer.js';
dotenv.config();
connectkafka();
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/api/job",jobroutes);
export default app;
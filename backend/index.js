import express from 'express'
import db from './config/mongoose-connection.js';
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoute.js';
import commentRouter from './routes/commentRoute.js';
import webhookRouter from './routes/webhookRoute.js'

const app = express();
app.use(cors(`${process.env.CLIENT_URL}`));

app.use('/webhook', webhookRouter);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        message: error.message || "something went wrong",
        status: error.status
    })
})


app.get('/' ,(req, res) => {
    res.send("sab sahi hai");
})
app.use('/user', clerkMiddleware(), userRouter);
app.use('/post', clerkMiddleware(), postRouter);
app.use('/comment', clerkMiddleware(), commentRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log('server is running');
})
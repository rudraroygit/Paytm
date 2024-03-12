const express= require('express');
const userRouter= require("./userRouter");


const router= express.Router();
const app= express();
app.use('/user',userRouter);

module.exports= router;
const express= require('express');
const userRouter= require("./userRouter");
const accountRouter= require('./accountRouter')

const router= express.Router();
const app= express();
app.use('/user',userRouter);
app.use('/bank',accountRouter)

module.exports= router;
const express=require('express')
const app = express()
const router= express.Router();
const zod= require('zod')
const {jwtSecret}=require('../config')
const {User}=require('../db')

const correctBody= zod.Schema({
    username: zod.string(),
    password: zod.string(),
    fisrtname: zod.string(),
    lastname: zod.string()
})


router.post('/signup',async (req,res)=>{
        const {success}= correctBody.safeParser(req.body);
        if(!success){
            return res.json({
                message: 'Email already taken / Incorrect inputs'
            })
        }

        const existingUser= await User.findOne({username: req.body.username})
        if(existingUser){
            return res.json({
                message: 'Email already taken / Incorrect inputs'
            })
        }

        const user= await User.create({
            username: req.bodu.username,
            password: req.body.password,
            firstname:req.body.firstName,
            lastname: req.body.lastName
        })

        const userId= user._id;
        const token= jwt.sign({
            userId
        },jwtSecret);

        res.json({
            message: 'User created succesfully',
            token: token
        })

})


module.exports= router;
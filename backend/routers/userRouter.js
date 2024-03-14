const express=require('express')
const jwt= require('jsonwebtoken')
const router= express.Router();
const zod= require('zod')
const {jwtSecret}=require('../config')
const {User,Account}=require('../db')
const {authMiddleware}= require('../middleware')

const correctBody= zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
});


router.post("/signup",async (req,res)=>{
        const {success}= correctBody.safeParse(req.body);
        
        if(!success){
            return res.json({
                message: 'Incorrect inputs'
            })
        }

        const existingUser= await User.findOne({username: req.body.username})
        if(existingUser){
            return res.json({
                message: 'Email already taken '
            })
        }

        const user= await User.create({
            username: req.body.username,
            password: req.body.password,
            firstname:req.body.firstname,
            lastname: req.body.lastname
        })

        const userId= user._id;

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })


        const token= jwt.sign({
            userId
        },jwtSecret);

        res.json({
            message: 'User created succesfully',
            token: token
        })

})




router.post( '/signin',async(req,res) =>{
      
    const email= req.body.username;
    const password= req.body.password;
    if(!email || !password){
       return  res.json({
            message: 'Incorrect inputs'
        })
    }
    
    const existingUser= await User.findOne({username: req.body.username})
        if(!existingUser){
            return res.json({
                message: 'Email does not exists'
            })
        }

    const user= User.findOne({
        username: email,
        password:password
    });

    if(user){
        const token= jwt.sign({userId: user._id},jwtSecret);
        return res.json({
        token:token,
        message: 'signin successfully!'})
    }

     res.json({
        message: 'Password does not match !'
    });


})


const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne( {
        _id: req.userId
    },req.body)

    return res.json({
        message: "Updated successfully"
    })
})


router.get("/bulk", async (req, res) => {
    
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})




module.exports= router;
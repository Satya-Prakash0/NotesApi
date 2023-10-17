const usermodel= require("../models/users");
const { checkout } = require("../routes/userroutes");
const bcrypt= require("bcryptjs");
const jwt=require("jsonwebtoken");
// const SECRET_KEY=process.env.SECRET_KEY;
const SECRET_KEY = "NotesApi";

const signup=async(req,res)=>{
    
    // Existing User check
    // Hash password
    //user creation
    //token generate

    const {username,password,email} = req.body;
    try {
        const existingUser = await usermodel.findOne({email:email}) ;
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashpassword= await bcrypt.hash(password,10);

        const result = await usermodel.create({
            email:email,
            password:hashpassword,
            username:username
        });

        const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY);

        res.status(200).json({user:result,token:token});

    } catch (error) {
        console.log(error);
        res.status(501).json({message: "something wrong"});
    }
}

const signin=async (req,res)=>{
     
    const {email,password}= req.body;

    try{

        const existingUser = await usermodel.findOne({email:email}) ;
        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }
        
        const matchpassword = await bcrypt.compare(password, existingUser.password);

        
        if(!matchpassword){
            return res.status(400).json({message: "invalid credentails"});
        }

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY);
        res.status(201).json({user:existingUser,token:token});

    }catch(error){
        console.log(error);
        res.status(501).json({message: "something wrong"});
    }
}

module.exports={signup,signin};
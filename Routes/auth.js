//to create new user we will use this url

const router =require("express").Router();
//importing user model in authentiation section
const User =require("../models/User")
//to encrypt passwor so that if someone acceses our database doesnot see password
const bcrypt = require('bcrypt');

//REGISTER
//to fcreate new user
router.post("/register",async(req,res)=>{
    try{
        console.log(req.body.password);
        //to hide password (encrypt) asynchronous function
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(req.body.password,salt); //new password
        // const newUser = new User(req.body) // this will take evering the user willl enter because we have written body so we can take input according to us
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            // password: req.body.password,
            password: hashedpass,
        });

        const user = await newUser.save(); 
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        //500 will show that there is some error with databacse or jason
        res.status(500).json(err);
    }
})


//LOGIN
router.post("/login",async (req,res)=>{
    try{
        //to find username in database 
        const user = await User.findOne({username : req.body.username});
        !user && res.status(400).json("wrong credential");
        //to match pssword 
        const validate = await bcrypt.compare(req.body.password ,user.password)
        !validate && res.status(400).json("wrong credential");

        const {password, ...others } = user._doc; 
        // res.status(200).json(user);
        res.status(200).json(others);
    }   
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;

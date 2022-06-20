const express=require("express");
const app =express()
const {default:mongoose}=require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./Routes/auth")
const userRoute = require("./Routes/users") //after inmporting you have to "use" it down 
const postRoute = require("./Routes/posts")
const categoryRoute = require("./Routes/categories")
const multer = require("multer");
// var path =require('path')


dotenv.config()
app.use(express.json());

mongoose
    .connect('mongodb+srv://jyotis0401:gfebnjav@cluster0.jdogh.mongodb.net/Minor?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
    })
    .then(console.log("connected to MONGO"))
    .catch(err=>console.log(err));

    // try{
    const storage = multer.diskStorage({
        //this is going to have three things ,req, file,and call back function

        destination : (req,file, cb) => {
            cb(null,"images/")
        },
        filename:(req,file,cb)=>{
            cb(null,req.body.name);
        },
    })
                                        //:storage is the storage we have defined above
    const upload = multer({storage:storage});
    app.post("/api/upload",upload.single("file"),(req,res)=>{
        res.status(200).json("File has been uploaded");
    });
// }
// catch(err){
//     console.log(err);
// }


    app.use("/api/auth",authRoute);
    app.use("/api/users",userRoute);
    app.use("/api/posts",postRoute);
    app.use("/api/categories",categoryRoute);
  
app.listen('5000', () =>{
    console.log('Backend is running');
})
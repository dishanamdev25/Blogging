//to be able to update and delte our user

const router =require("express").Router();
//importing user model in user section
const User =require("../models/User")
const bcrypt =require("bcrypt");
const Post=require("../models/Post") // imported post model because we want to delte post model also
//UPDATE
//:id will find user by id
router.put("/:id",async(req,res)=>{
    if(req.body.userId===req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }
    try{
        const updatedUser = await User.findByIdAndUpdte(req.params.id,
            {
            $set:req.body,
            },
            {new:true}
            );
        res.status(200).json(updatedUser)
    }catch(err){
        //500 will show that there is some error with databacse or jason
        res.status(500).json(err);
    }
} else{
    res.status(401).json("You can onlu Update Your Account");
}
});


//DELETE

router.delete("/:id",async(req,res)=>{
    if(req.body.userId===req.params.id){
        //even after deleting id we will see all the posts so we will delte all the posts also
        try{ //nessted try 
                const user = await User.findById(req.params.id);
        
            try{
                //to delete post of that user
                await Post.deleteMany({username:user.username})
                //to delete the user id 
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted...")
            }catch(err){
                //500 will show that there is some error with databacse or jason
                res.status(500).json(err);
    }
}
    catch(err){ //end of first try block which is used to delte posts 
          res.status(404).json("user not found")  
    }
} else{
    res.status(401).json("You can delte only Update Your Account");
}
});


//GET USER
router.get('/:id' ,async(req,res)=>{
    try{

        const user =await User.findById(req.params.id);
        const {password , ...others} =user._doc;
        res.status(200).json(others);
    }catch(err){

    }
})

module.exports = router;

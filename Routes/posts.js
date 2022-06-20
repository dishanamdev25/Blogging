//create new post ,use them ,delete them

//to be able to update and delte our user

const router =require("express").Router();
//importing user model in user section
const User =require("../models/User")
const Post=require("../models/Post") // imported post model because we want to delte post model also
//CREATE NEW POST
//:id will find user by id
router.post("/",async(req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    }catch(err){
        res.status(500).json(err);
    }
});


//UPDATE POST

router.put("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
        try{
           const updatedPost=await Post.findByIdAndUpdate(
               req.params.id,
               {
               $set:req.body,
                },
                 {new:true} 
           );
           res.status(200).json(updatedPost);
        }
    
    catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}else{
    res.status(401).json("You can update only your profile"); 
}

}
catch(err){
    console.log(err)
    res.status(500).json(err)
}
})





//DELETE POST
router.delete("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
        try{
           await post.delete();
           res.status(200).json('post has been deleted')
        }
    
    catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}else{
    res.status(401).json("You can delete only your post"); 
}

}
catch(err){
    console.log(err)
    res.status(500).json(err)
}
});


//GET Post
router.get('/:id' ,async(req,res)=>{
    try{
        const post =await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){

    }
})

//GET ALL POST
router.get("/", async(req,res)=>{
    //quer is gonna look at question mark (/?user=) and the first value is query
    const username = req.query.user;
    const catName = req.query.cat;
    try{
            let posts; //let used because changablae
            if(username){
                posts = await Post.find({username});
                
            }
            else if(catName){
                posts = await Post.find({categories:{ // look in array of categories 
                    $in:[catName] //inside catName
                }})
            } else{
                posts = await Post.find();
            }
            res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;

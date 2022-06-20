//model schea to define structure of the documents storesd in the database 


const mongoose = require("mongoose")


const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    
} //end of firsrt { timestamps:true}  
);

module.exports = mongoose.model("Category",CategorySchema);
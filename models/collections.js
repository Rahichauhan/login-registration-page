const mongoose=require("mongoose");
const newSchema= new mongoose.Schema({
    username:
    {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
    },
  
})
const Collection=new mongoose.model("Collection",newSchema);
module.exports=Collection;
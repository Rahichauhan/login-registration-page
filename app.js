const express=require("express");
const path = require("path");
const app=express();
const bcryptjs=require("bcryptjs");
require("./db/conn");
const Collection = require("./models/collections");
// const { json } = require("express");
require("hbs");
const port=process.env.port||3000;
const static_path = path.join(__dirname, "..");
const template_path = path.join(__dirname, "../views");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

// app.get("/",(req,res)=>{
//     res.send("Shri shivay Namastubhyam");
// })
app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/registerpage",(req,res)=>{
    res.render("register");
})
app.get("/loginpage",(req,res)=>{
    res.render("index");
})



app.post("/register",async (req,res)=>{
    try{


        
    const hashedPassword=await bcryptjs.hash(req.body.password,10);
        const employeschema=new Collection({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        
        })
        const registered=await employeschema.save();
        res.status(201).render("index");
        console.log(registered);
    }catch(error){
        res.status(400).send(error);
    }

});



// app.post("/index", async (req, res) => {
   
//     try {   
//        res.status(201).render("done");
//    }catch (error) {
//        res.status(400).send(error);
//    }
// });

app.post("/index", async (req, res) => {
    try{
        const{username,password}=req.body;
        const user = await Collection.findOne({username});
        console.log(user);
        if(!user)
        {
            return res.render("index");
            
        }
        const isMatch=await bcryptjs.compare(password,user.password);
        if(!isMatch)
        {
            return res.render("index");
        }
       return  res.status(201).render("done");
    }catch (error) {
               res.status(400).send(error);
           }

});

   
   

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});
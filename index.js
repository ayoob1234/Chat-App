const express = require("express");// express pakage
const app = express();

const mongoose = require("mongoose");//mongoose pakage
const path = require("path");//pakage
const Chat = require("./models/chat.js");// chat data
const methodOverride = require("method-override");//pakage
//Port difine
const port = 8080;


// medilvarre
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded( {extended:true}));
//methodOverride
app.use(methodOverride("_method"));

// data base connection
mongoose.connect('mongodb://127.0.0.1:27017/watsapp')
  .then(() => console.log('Connected!'));


//Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
 //console.log(chats);
  res.render("index.ejs", { chats });
});



//New Route
app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");

});  


//Create Route
app.post("/chats",(req,res)=>{
   let{from,to,msg}=req.body;
   let newChat = new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date(),
   });
   newChat.save().then(res=>{console.log("chat was saved")}).catch(err=>{console.log(err)});  
      res.redirect("/chats");});
   

   
      //Edit Route
   app.get("/chats/:id/edit",async (req,res)=>{
   
    let {id}=req.params;
 
   let chat = await Chat.findById(id);
   
     res.render("edit.ejs",{chat});

   }); 


//update
app.put("/chats/:id", async(req,res)=>{
  let {id} = req.params;
  let {msg:newMsg} = req.body;
    let updatedChat= await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators : true,new:true});
     //console.log(updatedChat);
     res.redirect("/chats");

 })

//Delte Route
app.delete("/chats/:id",async (req,res)=>{
  let {id}=req.params;
  let deleteChat = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

// root / home router
app.get("/", (req, res) => {
  res.send("Welcome to mini watsapp ");
});

//server cheak
app.listen(port, (req, res) => {
  console.log(`server is listing for ${port}`);
});

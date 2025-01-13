const express = require("express");// express pakage
const app = express();
const  dotenv = require("dotenv").config();
const  connection = require("./db.js");


//const mongoose = require("mongoose");//mongoose pakage
const path = require("path");//pakage
const Chat = require("./models/chat.js");// chat data
const methodOverride = require("method-override");//pakage

//Port difine
const port = process.env.PORT;
//const con = process.env.URL;


// medilvarre
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded( {extended:true}));
//methodOverride
app.use(methodOverride("_method"));

// data base connection
// mongoose.connect(URL)
//   .then(() => console.log('Connected!')).catch((err)=>{console.log(err);});


//Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});




//New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});


//Create Route
app.post("/chats", async (req, res) => {
  let { from, to, msg } = req.body;
  try {
    let newChat = new Chat({ from, to, msg, created_at: new Date() });
    await newChat.save();
    res.rer("/chats");
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

     
      
   

   
      //Edit Route
      app.get("/chats/:id/edit", async (req, res) => {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        res.render("edit.ejs", { chat });
      });
      


//update
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
  res.redirect("/chats");
});


//Delte Route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});


// root / home router
// app.get("/", (req, res) => {
//   res.send("Welcome to mini watsapp ");
// });

//server cheak
app.listen(port, async () => {
  await connection;
  console.log(`Server is listening on port ${port}`);
});


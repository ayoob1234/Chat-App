const mongoose = require("mongoose");
const Chat = require("./models/chat");



mongoose.connect('mongodb://localhost:27017/watsapp')
.then(() => console.log('Connected to MongoDB successfully'))
.catch((error) => console.error('Failed to connect to MongoDB', error));
  

let allChat=[
    {
    from:"arfeen",
    to:"gaosh",
    msg:"send me your exam sheets",
    created_at:new Date(),
},
{
    from:"arfeen",
    to:"gaosh",
    msg:"send me your exam sheets",
    created_at:new Date(),
},
{
    from:"arfeen",
    to:"gaosh",
    msg:"send me your exam sheets",
    created_at:new Date(),
},
{
    from:"arfeen",
    to:"gaosh",
    msg:"send me your exam sheets",
    created_at:new Date(),
},
{
    from:"jubair",
    to:"theek ",
    msg:"tum batao",
    created_at:new Date(),
},
{
    from:"arvind",
    to:"gaosh",
    msg:"what are you doing ",
    created_at:new Date(),
},
{
    from:"arfeen",
    to:"ayoob ",
    msg:"i'm sir ",
    created_at: new Date().toString(),
},

];



Chat.insertMany(allChat);
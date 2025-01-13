# Mini WhatsApp Backend Documentation

This documentation provides an overview of the backend functionality of a **Mini WhatsApp** application built with **Node.js**, **Express**, **MongoDB**, and **EJS** for rendering views.

## Table of Contents

1. [Overview](#overview)
2. [Dependencies](#dependencies)
3. [App Structure](#app-structure)
4. [Routes](#routes)
   - [Index Route](#index-route)
   - [New Route](#new-route)
   - [Create Route](#create-route)
   - [Edit Route](#edit-route)
   - [Update Route](#update-route)
   - [Delete Route](#delete-route)
5. [Database Connection](#database-connection)
6. [Middleware](#middleware)
7. [Starting the Server](#starting-the-server)

## Overview

This application serves as a basic backend for a **Mini WhatsApp** chat application. It supports the following functionalities:

- Viewing all chats
- Creating new chats
- Editing existing chats
- Deleting chats

It uses **MongoDB** for storage and **Express** for the server-side logic.

## Dependencies

This project uses the following dependencies:

- `express`: Web framework for Node.js to handle routing and middleware.
- `mongoose`: ODM (Object Data Modeling) library for MongoDB to interact with the database.
- `path`: Provides utilities for working with file and directory paths.
- `method-override`: Allows using HTTP verbs such as PUT and DELETE in places where the client doesn't support them (like browsers).
- `ejs`: Templating engine to render HTML views dynamically.

To install the dependencies, run the following command:

```bash
npm install express mongoose path method-override ejs
App Structure
The application structure is as follows:

bash
Copy code
/public
    /style.css  # Styles for the views
/models
    chat.js      # Mongoose model for Chat data
/views
    index.ejs    # View to display all chats
    new.ejs      # View for creating a new chat
    edit.ejs     # View for editing an existing chat
app.js           # Main application file
Routes
Index Route (GET /chats)
This route fetches all the chat data from the MongoDB database and displays it using the index.ejs view.

js
Copy code
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});
Action: Retrieves all chats from the database and renders them.
Route URL: /chats
HTTP Method: GET
New Route (GET /chats/new)
This route renders a form to create a new chat.

js
Copy code
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});
Action: Renders a form to input a new chat.
Route URL: /chats/new
HTTP Method: GET
Create Route (POST /chats)
This route handles the creation of a new chat entry in the database.

js
Copy code
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  newChat.save()
    .then(() => {
      console.log("chat was saved");
      res.redirect("/chats");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/chats");
    });
});
Action: Creates a new chat in the database and redirects to the /chats page.
Route URL: /chats
HTTP Method: POST
Edit Route (GET /chats/:id/edit)
This route renders a form to edit a specific chat identified by its ID.

js
Copy code
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});
Action: Fetches a specific chat by its ID and renders it in an edit form.
Route URL: /chats/:id/edit
HTTP Method: GET
Update Route (PUT /chats/:id)
This route handles the updating of a chat message by its ID.

js
Copy code
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
  res.redirect("/chats");
});
Action: Updates the msg field of the chat identified by its ID and redirects to /chats.
Route URL: /chats/:id
HTTP Method: PUT
Delete Route (DELETE /chats/:id)
This route deletes a specific chat from the database by its ID.

js
Copy code
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});
Action: Deletes the chat identified by its ID from the database and redirects to /chats.
Route URL: /chats/:id
HTTP Method: DELETE
Database Connection
This application connects to a local MongoDB instance running on mongodb://127.0.0.1:27017/watsapp.

js
Copy code
mongoose.connect('mongodb://127.0.0.1:27017/watsapp')
  .then(() => console.log('Connected!'));
The database name is watsapp.
The connection is established using mongoose.connect.
Middleware
Static File Middleware
Static files like CSS, images, and JavaScript are served from the public directory:

js
Copy code
app.use(express.static(path.join(__dirname, "public")));
Body Parsing Middleware
The app uses express.urlencoded to parse incoming form data:

js
Copy code
app.use(express.urlencoded({ extended: true }));
Method Override Middleware
This allows the use of HTTP methods like PUT and DELETE in browsers that don't natively support them:

js
Copy code
app.use(methodOverride("_method"));
Starting the Server
The server is started on port 8080:

js
Copy code
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
Port: 8080
To start the server, run node app.js from your terminal.
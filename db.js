// db.js
const mongoose = require('mongoose');
const { DB_URL } = process.env;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection failed:", error));

module.exports = mongoose;

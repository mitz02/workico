const express = require('express');
const app = express();
const mongoose = require("mongoose");
const providerAuth = require("./router/providerAuth");
const userAuth = require("./router/userAuth")
const dotenv = require("dotenv")
const jobList = require("./router/jobList");
const user = require("./router/user")

dotenv.config();

// database connection
mongoose.connect('mongodb://127.0.0.1:27017/dbLinker', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the database');
}).catch((err) => {
  console.error('Error connecting to the database:', err);
});

// handle all routes from the router folder

app.use(express.json());
app.use("/api/providerAuth", providerAuth)
app.use("/api/user", user)
app.use("/api/userAuth", userAuth)
app.use("/api/job", jobList)

// Other middleware setup (if needed)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // To serve your index.html



// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/registrationDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Dummy login (for testing only)
app.use(express.json()); // Ensure this is at the top

// Define schema
const User = require("./MODELS/User");

// Route to save form data
app.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send("User registered successfully");
  } catch (error) {
    res.status(400).send("Error saving user");
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users");
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).send("Error fetching user details");
  }
});



app.post('/login', (req, res) => {
  alert(req);
  const { username, password } = req.body;
  // For testing purpose, hardcoded credentials
  if (username == 'admin' && password == 'admin123') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});



// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

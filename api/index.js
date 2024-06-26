const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose")
const authRoute = require("./routes/auth.js")
const userRoute = require("./routes/users.js")
const postRoute = require("./routes/posts.js")
const categoryRoute = require("./routes/category.js")
const multer = require("multer");
const cors = require('cors')
const path = require('path');
const router = require("express").Router();

require('dotenv').config()
app.use(cors())
app.use(express.json())
// app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.MONGO_DB)

const storage = multer.memoryStorage();

// Initialize upload
const upload = multer({
  storage,
  limits: { fileSize: 30000000 }, // Limit file size to 1MB
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });

const Post = require("./models/Post.js");
const User = require("./models/User.js");


app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const { username } = req.body;
    const { title } = req.body;
    const { desc } = req.body;
    const imageBase64 = imageBuffer.toString('base64');
    const imageUrl = `data:${req.file.mimetype};base64,${imageBase64}`;

    const newPost = new Post({
      photo: imageUrl,
      username,
      title,
      desc
    });

    await newPost.save();

    res.status(200).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put("/api/uploading/:id", upload.single("file"), async (req, res) => {
  const { userId } = req.body;
  // const { username } = req.body;
  // const { email } = req.body;
  // const { password } = req.body;
  if (userId === req.params.id) {
    try {
      const imageBuffer = req.file.buffer;
      const imageBase64 = imageBuffer.toString('base64');
      const imageUrl = `data:${req.file.mimetype};base64,${imageBase64}`;

      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          profilePic: imageUrl,
        },
        { new: true });
      res.status(200).json(updateUser)
    } catch (error) {
      res.status(500).json(error);
    }
  }
  else {
    res.status(401).json("You can update only your account");
  }
});

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/category", categoryRoute)

app.listen(port, () => {
  console.log(`Backend is runnging on http://localhost:${port}`);
})
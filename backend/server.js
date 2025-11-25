const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const uploadRoutes = require("./routes/upload");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/upload", uploadRoutes);


// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/",(req,res)=>{
  return "this is hom"
})

app.get("/", (req, res) => {
  res.send("Social Media Analyzer Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));

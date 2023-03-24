const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const app = express();
app.use(express.json());
// database connect
mongoose
  .connect(
    "mongodb+srv://ashokmanjhu:ashokmanjhu@cluster0.m8gxypg.mongodb.net/ProductVilla?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => console.log("MOngodb connected Successfully"))
  .catch((err) => console.log(err));
// Mongodb schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
// Api's
app.get("/", (req, res) => {
  res.send("Server is Running");
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    console.log(req.body);
    res.send(req.body);
  } catch (error) {
    console.log(error);
  }
});
app.listen("4000", () => {
  console.log("server is Running");
});

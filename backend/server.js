const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
// mongoose.set("strictQuery", true);
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// database connect
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign(
      { userId: user._id },
      "374jdshsdjhtuwifskdjhweiutfhwr"
    );
    res.status(201).send({ token });
  } catch (error) {
    res.status(401).send(error.message);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Creditanals");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        { userId: user._id },
        "374jdshsdjhtuwifskdjhweiutfhwr"
      );
      res.status(201).send({ token });
    } else {
      throw new Error("Invalid Creditanals");
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
});
app.listen("4000", () => {
  console.log("Server is Running");
});

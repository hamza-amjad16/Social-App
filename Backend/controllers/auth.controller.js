import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

const home = async (req, res) => {
  try {
    res.status(200).send("Hello World");
  } catch (error) {
    console.log(error);
  }
};

// user register
const register = async (req, res) => {
  try {
    console.log(req.body);

    const { username, email, phone, password } = req.body;

    const userexsist = await User.findOne({ email: email });

    if (userexsist) {
      return res.status(400).json({ message: "Email already exsist" });
    }

    // hash the password
    // const saltRound = 10
    // const hash_password = await bcrypt.hash(password , saltRound)

    const user = await User.create({
      username,
      email,
      phone,
      password,
    });

    res
      .status(200)
      .json({
        msg: "Registration successfully",
        token: await user.generateToken(),
        userId: user._id.toString(),
      });
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

// user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userexsist = await User.findOne({ email });

    if (!userexsist) {
      res.status(400).json({ message: "Invaild Credentials" });
    }

    // const user = await bcrypt.compare(password, userexsist.password);
    const user = await userexsist.comparePassword(password)

    if (user) {
      res
        .status(200)
        .json({
          msg: "Login successfully",
          token: await userexsist.generateToken(),
          userId: userexsist._id.toString(),
        });
    } else {
      res.status(401).json({ message: "Invaild email or password" });
    }
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

// send currently user data
const user = async(req , res) => {
  try {
    const userData = req.user
    console.log(userData);
    return res.status(200).json({ userData })

  } catch (error) {
    console.log("Error from user route" , error);
    
  }
}

export { home, register, login , user };

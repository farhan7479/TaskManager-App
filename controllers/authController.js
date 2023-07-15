const userModel = require("../models/userModel.js");
const {
  comparePassword,
  hashPassword,
} = require("../helpers/authHelper.js");
const JWT = require("jsonwebtoken");

exports.registerController = async (req, res) => {
  const { name, email, password, phone, address, answer } = req.body;
  // Validations
  if (!name) {
    return res.send({ error: "Name is Required" });
  }
  if (!email) {
    return res.send({ message: "Email is Required" });
  }
  if (!password) {
    return res.send({ message: "Password is Required" });
  }
  if (!phone) {
    return res.send({ message: "Phone no is Required" });
  }
  if (!address) {
    return res.send({ message: "Address is Required" });
  }
  if (!answer) {
    return res.send({ message: "Answer is Required" });
  }

  // Check user
  const exisitingUser = await userModel.findOne({ email });
  // Existing user
  if (exisitingUser) {
    return res.status(200).send({
      success: false,
      message: "Already Registered, please login",
    });
  }

  // Register user
  const hashedPassword = await hashPassword(password);
  // Save
  const user = await new userModel({
    name,
    email,
    phone,
    address,
    password: hashedPassword,
    answer,
  }).save();

  res.status(201).send({
    success: true,
    message: "User Registered Successfully",
    user,
  });
};

// POST LOGIN
exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  // Validation
  if (!email || !password) {
    return res.status(404).send({
      success: false,
      message: "Invalid email or password",
    });
  }

  // Check user
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).send({
      success: false,
      message: "Email is not registered",
    });
  }
  const match = await comparePassword(password, user.password);
  if (!match) {
    return res.status(200).send({
      success: false,
      message: "Invalid Password",
    });
  }

  // Token
  const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.status(200).send({
    success: true,
    message: "Login successful",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    },
    token,
  });
};

// Forget password controller
exports.forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    // Check
    const user = await userModel.findOne({ email, answer });
    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// Update profile
exports.updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    // Password
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }
    const hashedPassword = password
      ? await hashPassword(password)
      : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};

const Company = require("../models/company");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.register = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    let company = await Company.findOne({ email });

    if (company) {
      return res.status(400).json({ message: "Company already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(20).toString("hex");

    company = new Company({
      name,
      email,
      mobile,
      password: hashedPassword,
      verificationToken,
    });

    await company.save();

    const verificationUrl = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;
    const message = `Please verify your email by clicking the following link: ${verificationUrl}`;

    await sendEmail({
      to: email,
      subject: "Email Verification",
      text: message,
    });

    res
      .status(201)
      .json({ message: "Registration successful. Please verify your email." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const company = await Company.findOne({ verificationToken: token });
    if (!company) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    company.isVerified = true;
    company.verificationToken = undefined;
    await company.save();

    res
      .status(200)
      .json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!company.isVerified) {
      return res.status(400).json({
        message: "Please verify your email to activate your account.",
      });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT payload
    const payload = {
      company: {
        id: company.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

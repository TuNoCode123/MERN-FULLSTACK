import * as nodemailer from "nodemailer";
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.PASSWORD, // Your password
  },
});
export default transporter;

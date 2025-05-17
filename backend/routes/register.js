const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/user.json");

router.post("/", (req, res) => {
  const { firstName, lastName, email, password, category, occupation } = req.body;

  // ตรวจสอบว่ามีข้อมูลครบหรือไม่
  if (!firstName || !lastName || !email || !password || !category || !occupation) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading user.json:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    let users = [];
    try {
      users = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing user.json:", parseError);
      return res.status(500).json({ message: "User data is corrupted." });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.json({ message: "This email has already been used." });
    }

    // ✅ เพิ่มผู้ใช้ใหม่แบบเก็บข้อมูลครบถ้วน
    const newUser = { firstName, lastName, email, password, category, occupation };
    users.push(newUser);

    fs.writeFile(dataPath, JSON.stringify(users, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing to user.json:", writeErr);
        return res.status(500).json({ message: "Failed to register user." });
      }

      res.json({ message: "Register successfully." });
    });
  });
});

module.exports = router;




   
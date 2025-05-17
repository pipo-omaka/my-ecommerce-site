const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const filePath = path.join(__dirname, '../data/user.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    let users;
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).json({ message: "Invalid user data" });
    }

    const user = users.find(u => u.email === email);

    if (!user) {
      return res.json({ message: "Incorrected Username" });
    }

    if (user.password !== password) {
      return res.json({ message: "Incorrected Password" });
    }

    return res.json({ message: "Login successfully." });
  });
});

module.exports = router;

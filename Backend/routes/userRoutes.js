const express = require ('express')
const User = require ('../models/User.js')

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User saved to database" });
  } catch (error) {
    res.status(500).json({ message: "Error saving user", error });
  }
});

module.exports = router;
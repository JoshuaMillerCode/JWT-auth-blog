import express from 'express';
import { SignJWT } from 'jose';
import User from '../models/User.js'; // Note: need .js extension

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user, message: 'User created successfully' });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'User Already Exists', error: error.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({
      id: user._id,
      username: user.username,
      email: user.email,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(process.env.JWT_EXPIRATION)
      .sign(secret);

    res.status(200).json({ user, token, message: 'User logged in' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, interests, role } = req.body;
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) return res.status(400).json({ message: 'User already exists with this email or phone.' });
    const user = await User.create({ firstName, lastName, email, phone, password, interests, role });
    const token = generateToken(user);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });
    const token = generateToken(user);
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.googleAuth = async (req, res) => {
  try {
    const { credential, role } = req.body;
    if (!credential) return res.status(400).json({ message: 'Missing Google credential' });
    const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const email = payload.email;
    const firstName = payload.given_name || 'GoogleUser';
    const lastName = payload.family_name || '';
    // Check if user exists
    let user = await User.findOne({ email, role });
    if (!user) {
      // Register new user
      user = await User.create({
        firstName,
        lastName,
        email,
        phone: '',
        interests: '',
        password: 'google-oauth',
        role,
      });
    }
    const token = generateToken(user);
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    console.log('UpdateUserProfile called with id:', req.params.id, 'body:', req.body);
    const userId = req.params.id;
    const { firstName, lastName, phone, interests, password } = req.body;
    const updateData = { firstName, lastName, phone, interests };
    if (password) updateData.password = password;
    // Do not allow updating email or role
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      interests: user.interests,
    });
  } catch (err) {
    console.error('UpdateUserProfile error:', err);
    res.status(500).json({ message: err.message });
  }
}; 
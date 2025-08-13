const express = require('express');
const router = express.Router();
const { register, login, getUserById, getAllUsers, googleAuth, updateUserProfile } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/:id', getUserById);
router.get('/', getAllUsers);
router.put('/:id', updateUserProfile);

module.exports = router; 
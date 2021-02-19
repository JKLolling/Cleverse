// backend/routes/api/users.js
const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  const user = await User.signup(username, email, password)
  await setTokenCookie(res, user)
  res.json({ user })
}))

module.exports = router;

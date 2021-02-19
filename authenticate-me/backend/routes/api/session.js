const express = require('express')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res, next) => {
  const { credential, password } = req.body
  const user = await User.login({ credential, password })
  if (user) {
    await setTokenCookie(res, user)
    res.json({ user })
  }
  else {
    const err = new Error('Login Failed')
    err.status = 401
    err.title = 'Login Failed'
    err.errors = ['The provided credentials were invalid.']
    return next(err)
  }
}))

router.delete('/', (req, res) => {
  res.clearCookie('token')
  return res.json({ message: 'success' })
})

router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

module.exports = router;

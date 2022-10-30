import { Router } from 'express';
import { User, addUser, getUserByUsername, comparePassword } from '../schemas/user.schema';
import * as jwt from 'jsonwebtoken';
import passport = require('passport');
import moment = require('moment');

export const usersRoutes = Router();

usersRoutes.post('/register', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  addUser(newUser, (err, user) => {
    if (err) res.json({ success: false, msg: 'Failed to register user' });
    else res.json({ success: true, msg: 'User registered' });
  });
});

usersRoutes.post('/login', (req, res) => {
  const { username, password } = req.body;

  getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ success: false, msg: 'Wrong username/password' });

    comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ user }, process.env.SECRET, {
          expiresIn: 604800 // 1week in seconds
        });

        res.json({
          success: true,
          token: `${token}`,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        })
      }
      else res.json({ success: false, msg: 'Wrong username/password' })
    });

  });
});

usersRoutes.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user })
});

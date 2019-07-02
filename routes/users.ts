import express, { Request, Response } from 'express';
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route       POST api/users
// @description Register a user
// @access      Public
router.post(
  '/',
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('Passed');
  }
);

module.exports = router;
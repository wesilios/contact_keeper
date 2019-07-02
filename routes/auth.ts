import express from 'express';
const router = express.Router();

// @route       GET api/auth
// @description Getlogged in user
// @access      Private
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// @route       POST api/auth
// @description Auth user & get token
// @access      Public
router.post('/', (req, res) => {
  res.send('Logged in user');
});

module.exports = router;

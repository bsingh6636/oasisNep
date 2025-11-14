const express = require('express');
const { testEmail } = require('../controller/test.Contoller.js');

const router = express.Router();

router.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).send('Forbidden');
  }
  return next();
});

router.get('/test-email', testEmail);

module.exports = router;

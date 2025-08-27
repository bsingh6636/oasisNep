const express = require('express');
const router = express.Router();
const { addSubscription } = require('../services/push.service');
const authJwt = require('../middleware/auth.jwt');

router.post('/subscribe', [authJwt.verifyToken], async (req, res) => {
  try {
    const userId = req.userId;
    const subscription = req.body;

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ message: 'Invalid subscription data.' });
    }

    const success = await addSubscription(userId, subscription);
    if (success) {
      res.status(201).json({ message: 'Subscription saved successfully.' });
    } else {
      res.status(500).json({ message: 'Failed to save subscription.' });
    }
  } catch (error) {
    console.error('Error in subscribe route:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;

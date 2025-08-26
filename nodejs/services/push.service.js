const webpush = require('web-push');

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY
};

webpush.setVapidDetails(
  'mailto:bsingh6636@gmail.com', // Replace with your email
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Database store for subscriptions
const db = require('../models');
const UserSubscription = db.user; // Assuming subscription field exists in user model

const addSubscription = async (userId, subscription) => {
  try {
    await UserSubscription.update(
      { pushSubscription: JSON.stringify(subscription) },
      { where: { id: userId } }
    );
    return true;
  } catch (error) {
    console.error('Error saving subscription:', error);
    return false;
  }
};

const getSubscription = async (userId) => {
  try {
    const user = await UserSubscription.findByPk(userId);
    return user?.pushSubscription ? JSON.parse(user.pushSubscription) : null;
  } catch (error) {
    console.error('Error getting subscription:', error);
    return null;
  }
};

const sendNotification = async (userId, payload) => {
  try {
    const subscription = await getSubscription(userId);
    if (subscription) {
      await webpush.sendNotification(subscription, JSON.stringify(payload));
      console.log(`Push notification sent to user ${userId}`);
    } else {
      console.log(`No subscription found for user ${userId}`);
    }
  } catch (error) {
    console.error('Error sending notification:', error);
    // Handle expired subscriptions
    if (error.statusCode === 410) {
      console.log(`Subscription expired for user ${userId}, removing...`);
      await removeSubscription(userId);
    }
  }
};

const removeSubscription = async (userId) => {
  try {
    await UserSubscription.update(
      { pushSubscription: null },
      { where: { id: userId } }
    );
  } catch (error) {
    console.error('Error removing subscription:', error);
  }
};

module.exports = {
  addSubscription,
  sendNotification,
  removeSubscription
};

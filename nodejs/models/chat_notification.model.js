module.exports = (sequelize, Sequelize) => {
  const ChatNotification = sequelize.define('chat_notifications', {
    is_muted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
    // user_id and chat_id will be added via associations
  });

  return ChatNotification;
};

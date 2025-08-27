module.exports = (sequelize, Sequelize) => {
  const ChatMessage = sequelize.define('chat_messages', {
    message: {
      type: Sequelize.TEXT,
      allowNull: false
    }
    // chat_id and sender_id will be added via associations
  });

  return ChatMessage;
};

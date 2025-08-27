module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define('chats', {
    // customer_id and admin_id will be added via associations
  });

  return Chat;
};

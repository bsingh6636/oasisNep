const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Add models here later
// This will be uncommented as we create models
db.user = require('./user.model.js')(sequelize, Sequelize);
db.service = require('./service.model.js')(sequelize, Sequelize);
db.order = require('./order.model.js')(sequelize, Sequelize);
db.secret = require('./secret.model.js')(sequelize, Sequelize);

// Relationships
db.user.hasMany(db.order, { as: 'orders' });
db.order.belongsTo(db.user, { as: 'user' });

db.service.hasMany(db.order, { as: 'orders' });
db.order.belongsTo(db.service, { as: 'service' });

db.order.hasOne(db.secret, { as: 'secret' });
db.secret.belongsTo(db.order, { as: 'order' });

// Chat Relationships
db.chat = require('./chat.model.js')(sequelize, Sequelize);
db.chatMessage = require('./chat_message.model.js')(sequelize, Sequelize);
db.chatNotification = require('./chat_notification.model.js')(sequelize, Sequelize);

// A chat is between a customer and an admin
db.chat.belongsTo(db.user, { as: 'customer', foreignKey: 'customerId' });
db.chat.belongsTo(db.user, { as: 'admin', foreignKey: 'adminId' });

// A message belongs to a chat and a sender
db.chat.hasMany(db.chatMessage, { as: 'messages' });
db.chatMessage.belongsTo(db.chat, { as: 'chat' });
db.chatMessage.belongsTo(db.user, { as: 'sender' });

// A user can have notification settings for a chat
db.chat.hasMany(db.chatNotification, { as: 'notificationSettings' });
db.chatNotification.belongsTo(db.chat, { as: 'chat' });
db.chatNotification.belongsTo(db.user, { as: 'user' });


module.exports = db;

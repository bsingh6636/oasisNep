const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM('customer', 'admin'),
      defaultValue: 'customer'
    },
    pushSubscription: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password_hash) {
          const salt = await bcrypt.genSalt(10);
          user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
      }
    },
    // Add this to prevent the password hash from being sent back
    defaultScope: {
      attributes: { exclude: ['password_hash'] }
    },
    scopes: {
      withPassword: {
        attributes: {}
      }
    }
  });

  // Instance method to compare passwords
  User.prototype.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password_hash);
  };

  return User;
};

module.exports = (sequelize, Sequelize) => {
  const Secret = sequelize.define('secrets', {
    secret_value_encrypted: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    expires_at: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });

  return Secret;
};

module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('orders', {
    status: {
      type: Sequelize.ENUM('pending', 'approved', 'rejected', 'expired'),
      defaultValue: 'pending'
    },
    transaction_proof_url: {
      type: Sequelize.STRING
    },
    transaction_code: {
      type: Sequelize.STRING
    }
  });

  return Order;
};

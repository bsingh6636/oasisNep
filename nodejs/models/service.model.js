module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define("services", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    }
  });

  return Service;
};

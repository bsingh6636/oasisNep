const db = require('../models');
const Service = db.service;

// Retrieve all Services from the database.
exports.findAll = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.send(services);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while retrieving services.'
    });
  }
};

// Find a single Service with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const service = await Service.findByPk(id);
    if (service) {
      res.send(service);
    } else {
      res.status(404).send({
        message: `Cannot find Service with id=${id}.`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Error retrieving Service with id=' + id
    });
  }
};

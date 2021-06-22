const { celebrate } = require('celebrate');
const express = require('express');

const SensorValidator = require('../validators/SensorValidator');
const SensorController = require('../controller/SensorController');

module.exports = class Routes {
  constructor() {
    this.routes = express.Router();

    return this.init();
  }

  init() {
    this.map()

    return this.routes
  }

  map() {
    this.routes.get('/sensor', celebrate(SensorValidator.getSensor()), SensorController.index);
    this.routes.post('/sensor', celebrate(SensorValidator.postSensor()), celebrate(SensorValidator), SensorController.store);
    this.routes.delete('/sensor', celebrate(SensorValidator.deleteSensor()), SensorController.delete);
  }
};

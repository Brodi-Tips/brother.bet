const { Segments, Joi } = require('celebrate');

module.exports = class SensorValidator {
  static getSensorTimestamps() {
    return {
      [Segments.QUERY]: Joi.object().keys({
        name: Joi.string().required(),
      }),
    };
  }

  static getSensor() {
    return {
      [Segments.QUERY]: Joi.object().keys({
        name: Joi.string().required(),
      }),
    };
  }

  static postSensor() {
    return {
      [Segments.QUERY]: Joi.object().keys({
        name: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        value: Joi.number().required(),
        timestamp: Joi.number().integer().required(),
      }),
    };
  }

  static deleteSensor() {
    return {
      [Segments.QUERY]: Joi.object().keys({
        name: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        timestamp: Joi.number().integer().required(),
      }),
    };
  }

  static ruleDate() {
    return {
      [Segments.QUERY]: Joi.object().keys({
        name: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        value: Joi.number().required(),
        date: Joi.string().required(),
        timestamp: Joi.number().integer().required(),
      }),
    };
  }
};

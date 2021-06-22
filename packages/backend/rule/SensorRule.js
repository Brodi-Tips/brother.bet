const moment = require('moment-timezone');

module.exports = class SensorRule {
  static date(req, res, next) {
    try {
      const { timestamp } = req.body;

      const dateFull = new Date(timestamp).getTime();
      const date = moment(dateFull).tz('UTC').format('YYYY/MM/DD HH:mm:ss.SSSSSSSSS');

      req.body.date = date;
      next();
    } catch (error) {
      res.send(error);
    }
  }
};

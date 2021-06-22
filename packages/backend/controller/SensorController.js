const Cloud = require('../model/database/Cloud');

const db = new Cloud('development').connection();

module.exports = class SensorController {
  static async index(req, res) {
    try {
      const { name } = req.query;
      const { timestamp } = req.body;

      const dateFull = new Date(timestamp).getTime();
      const date = moment(dateFull).tz('UTC').format('YYYY/MM/DD HH:mm:ss.SSSSSSSSS');

      req.body.date = date;

      const count = await db('sensor')
        .where({
          name,
        })
        .count()
        .first();

      const todos = await db('sensor')
        .where({
          name,
        })
        .select(['timestamp', 'date', 'value']);

      res.header('X-Total-Count', count['count(*)']);

      return res.status(200).json(todos);
    } catch (error) {
      res.send(error);
    }
  }

  static async store(req, res) {
    try {
      const { name } = req.query;
      const { date, value, timestamp } = req.body;

      const [id] = await db('sensor').insert({
        id: timestamp,
        name,
        date,
        value,
        timestamp,
      });

      return res
        .status(200)
        .json({ message: `Timestamp '${timestamp}', of sensor '${name}'  added! Id:`, id });
    } catch (error) {
      throw error;
    }
  }

  static async delete(req, res) {
    try {
      const { name } = req.query;
      const { timestamp } = req.body;

      const data = await db('sensor').where({ name, timestamp }).select('*').first();

      if (!data) return res.status(404).json({ error: 'Was not found that data.' });

      await db('sensor').where({ name, timestamp }).delete();

      return res
        .status(200)
        .json({ message: `Timestamp '${timestamp}', of sensor '${name}'  deleted!` });
    } catch (error) {
      throw error;
    }
  }
};

const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const FirestoreInit = require('../model/FirestoreInit')
const serviceAccountKey = require('../model/serviceAccountKey.json')

// eslint-disable-next-line no-unused-expressions
new FirestoreInit(serviceAccountKey).admin

const FifaArenaController = require('../controller/FifaArenaController')
const DatabaseConsistencyController = require('../controller/DatabaseConsistencyController')
const NeuralNetworkController = require('../controller/NeuralNetworkController')

const fifaArenaController = new FifaArenaController()
const databaseConsistencyController = new DatabaseConsistencyController()
const neuralNetworkController = new NeuralNetworkController()

const routes = express.Router()

routes.get(
  '/fifaArena',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      year: Joi.string().required(),
    }),
  }),
  fifaArenaController.index
)

routes.get(
  '/fifaArenaByDate',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      from: Joi.string().required(),
      to: Joi.string().required(),
    }),
  }),
  fifaArenaController.interval
)

routes.get(
  '/fifaArenaByDate',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      date: Joi.string().required(),
    }),
  }),
  fifaArenaController.show
)

routes.get(
  '/fifaArenaDates',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      year: Joi.string().required().length(4),
    }),
  }),
  fifaArenaController.indexDates
)

routes.post(
  '/fifaArena',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      year: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.array().required(),
  }),
  fifaArenaController.create
)

routes.delete(
  '/fifaArena',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      date: Joi.string().required(),
    }),
  }),
  fifaArenaController.delete
)

routes.get(
  '/databaseConsistency',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      type: Joi.string().required(),
    }),
  }),
  databaseConsistencyController.index
)

routes.post(
  '/databaseConsistency',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      type: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      aggregatedSet: Joi.number().integer().required(),
    }),
  }),
  databaseConsistencyController.create
)

routes.get(
  '/neuralNetwork',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      nameSet: Joi.string().required(),
    }),
  }),
  neuralNetworkController.index
)

routes.post(
  '/neuralNetwork',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      nameSet: Joi.string().required(),
    }),
  }),
  neuralNetworkController.create
)

module.exports = routes

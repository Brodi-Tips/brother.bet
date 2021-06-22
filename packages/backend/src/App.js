const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

module.exports = class App {
  constructor(routes) {
    this.routes = routes;
    this.server = express();
    this.middleware();
    this.router();
  }

  middleware() {
    this.server.use(
      cors()
      // origin: ''
    );
    this.server.use(express.json());
    this.server.use(errors());
  }

  router() {
    this.server.use(this.routes);
  }
};

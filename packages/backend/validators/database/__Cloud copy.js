const knex = require('knex');

module.exports = class Cloud {
  constructor(enviroment) {
    // Object
    this.knex = knex;

    // Variables
    this.enviroment = enviroment;
  }

  connection() {
    const development = this.development();
    const staging = this.staging();
    const production = this.production();

    if ((this.enviroment = 'development')) return this.knex(development);
    if ((this.enviroment = 'staging')) return this.knex(staging);
    if ((this.enviroment = 'production')) return this.knex(production);
  }

  development() {
    return {
      client: 'sqlite3',
      connection: {
        filename: './model/database/db.sqlite',
      },
      migrations: {
        directory: './model/database/migrations',
      },
      useNullAsDefault: true,
    };
  }

  staging() {
    return {
      client: 'postgresql',
      connection: {
        database: 'my_db',
        user: 'username',
        password: 'password',
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
      },
    };
  }

  production() {
    return {
      client: 'postgresql',
      connection: {
        database: 'my_db',
        user: 'username',
        password: 'password',
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
      },
    };
  }
};

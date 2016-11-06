const environment = process.env;

export let sequelizeConfiguration = {
  database: environment.SQ_DATABASE,
  username: environment.SQ_USERNAME,
  password: environment.SQ_PASSWORD,
  configuration: {
    host: environment.SQ_HOST,
    dialect: environment.SQ_DIALECT,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
};

export let isDev = environment.ENVIRONMENT === 'DEVELOPMENT';
export let port = environment.PORT || 4000;

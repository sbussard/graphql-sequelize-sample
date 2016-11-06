import Express from 'express';
import GraphHTTP from 'express-graphql';
import schema from '~/schema';
import {isDev, port} from '~/configuration';

let endpointUrl = '/';
let developmentLog = (message) => console.log(message);
let productionLog = (message) => { /* do someting more important */ };

let log = productionLog;
let options = {schema};

if (isDev) {
  log = developmentLog;
  options = {schema, pretty: true, graphiql: true};
}

let app = Express()
  .use(endpointUrl, GraphHTTP(options))
  .listen(port, log(`listening for requests on port ${port}`));

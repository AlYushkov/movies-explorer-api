const express = require('express');

const bodyParser = require('body-parser'); // Parse incoming request bodies

const { errors } = require('celebrate'); // function that wraps the joi validation library

const cookieParser = require('cookie-parser'); // Parse Cookie header and populate req.cookies

const mongoose = require('mongoose');

const helmet = require('helmet'); // secure Express apps by setting various HTTP headers

const { limiter } = require('./utils/requests-limit'); // Use to limit repeated requests to public API

const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const {
  NODE_ENV, PORT, MONGO_DB_NAME, HOST,
} = process.env;

const { DEV_MONGO_DB_NAME, DEV_PORT, DEV_HOST } = require('./utils/dev-params');

let host;
let port;
let dbName;

if (NODE_ENV === 'production') {
  host = HOST;
  port = PORT;
  dbName = MONGO_DB_NAME;
} else {
  host = DEV_HOST;
  port = DEV_PORT;
  dbName = DEV_MONGO_DB_NAME;
}

const appRouter = require('./routes/index');

const { cors } = require('./middlewares/cors');

const { errorHandle } = require('./middlewares/errorHandle');

const app = express();

app.use(cors);

app.use(helmet());

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.json());

app.use(requestLogger);

app.use(limiter);

app.use('/', appRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandle);

mongoose.set('strictQuery', true);

mongoose.connect(`mongodb://${host}/${dbName}`);

app.listen(port);

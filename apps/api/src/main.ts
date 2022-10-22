import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as passport from 'passport';
import { usersRoutes } from './app/routes/users';
import { DBHelper } from './app/helpers/db.helper';
import { PassportHelper } from './app/helpers/passport.helper';

import * as session from 'express-session';

const app = express();
const prefix = '/api';

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
PassportHelper.init(passport);
app.use(`${prefix}/users`, usersRoutes);

app.get(`${prefix}`, (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

DBHelper.init();

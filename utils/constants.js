require('dotenv').config();

const envProduction = 'production';

/* Server configuration: environment consts */
const {
  PORT = 3000,
  USERS_ROUTE: USERS = '/users',
  MOVIES_ROUTE: MOVIES = '/movies',
  MONGODB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  TOKEN_KEY = 'DEMO ===== some-secret-key ==== DEMO',
  NODE_ENV = envProduction,
} = process.env;

// Server routing consts
const userDirs = { id: 'userId', profile: 'me' };
const movieDirs = { id: 'filmId' };
const userRoutes = { userId: `/:${userDirs.id}`, userProfile: `/${userDirs.profile}` };
const movieRoutes = {
  filmId: `/:${movieDirs.id}`,
};
const signInRoute = '/signin';
const signUpRoute = '/signup';

/* Dbg/trace config vars */
const dbgFlag = false;
const trcFlag = false;
const dbgNoCORSFlag = false;
const dbgNoAuthFlag = false;
const dbgNoLogFlag = false;
const trcMoviesFlag = false;
const trcSchValidateFlag = false;
const errTraceFlag = true; // works independently from trcFlag & non production mode requirement

/* Logging config consts */
const reqLogFName = 'request.log';
const errLogFName = 'error.log';

/* Mongoose model config consts */
const strSchMinLen = 2;
const strSchMaxLen = 30;
const idSchemaLen = 24;
const strSchPassLen = 8;
const emailPattern = /^[a-z0-9]+[a-z0-9\-_.]*@[a-z0-9]+[a-z0-9\-_.]*\.[a-z0-9]+[a-z0-9\-_.]*$/;
const usrEmailFailMsg = 'Field typed is not a valid e-mail address';
const linkFailMsg = 'Incorrect link address';
const urlValidOptions = { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true };

/* CORS config consts */
const allowedCors = [ // Массив доменов, с которых разрешены кросс-доменные запросы
  'borrissytsch-diploma.nomoredomainsrocks.ru', 'https://borrissytsch-diploma.nomoredomainsrocks.ru',
  'borrissytsch-diploma.nomoredomainsrocks.ru/app', 'https://borrissytsch-diploma.nomoredomainsrocks.ru/app',
  'borrissytsch-diploma.nomoredomainsrocks.ru/signin', 'https://borrissytsch-diploma.nomoredomainsrocks.ru/signin',
  'borrissytsch-diploma.nomoredomainsrocks.ru/signup', 'https://borrissytsch-diploma.nomoredomainsrocks.ru/signup',
  'borrissytsch-diploma.nomoredomainsrocks.ru/users', 'https://borrissytsch-diploma.nomoredomainsrocks.ru/users',
  'borrissytsch-diploma.nomoredomainsrocks.ru/users/me', 'https://borrissytsch-diploma.nomoredomainsrocks.ru/users/me',
  'borrissytsch-diploma.nomoredomainsrocks.ru/movies', 'https://borrissytsch-diploma.nomoredomainsrocks.ru/movies',
  'localhost:3000', 'localhost:3000/signup', 'localhost:3000/signin', 'http://localhost:3000',
  'http://localhost:3000/app', 'localhost:3000/app', 'http://localhost:3000/users', 'localhost:3000/users',
  'http://localhost:3000/users/me', 'localhost:3000/users/me',
  'http://localhost:3000/users/movies', 'localhost:3000/users/movies',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE'; // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)

/* User auth config consts */
const tokenDuration = '7d';
const authHeaderPattern = 'Bearer ';
const authNeedMsg = 'Необходима авторизация';

/* Validation consts 4 joi failed patterns */
const idPattern = /^[0-9a-f]{24}$/;
const linkPattern = /^(https?:\/\/)?(w{3}[0-9]?\.)?[0-9a-z_]+[0-9a-z._-]*\.[0-9a-z_]+(\/[0-9a-z_]+[0-9a-z._-]*)*(#|\/)?$/;

/* Error processing config consts */
const resOkDefault = 200;
const resOKCreated = 201;
const errIncorrectData = {
  num: 400,
  name: 'Incorrect data',
  msg: 'Incorrect data were sent to movie/user create or profile update methods',
};
const errAuth = {
  num: 401,
  name: 'Authentification failed',
  msg: 'Неправильные почта или пароль',
};
const errForbidden = {
  num: 403,
  name: 'Access forbidden',
  msg: 'Only movie owner can delete a movie',
};
const errNotFound = {
  num: 404,
  name: 'Not found',
  msg: 'movie/user not found',
};
const errEmailExists = {
  num: 409,
  name: 'Email already exists',
  msg: 'E-mail already exists, try another one',
};
const errDefault = {
  num: 500,
  name: 'Server error',
  msg: 'На сервере произошла ошибка',
};
const errCastErr = 'CastError';
const errValidationErr = 'ValidationError';
const errMongoServerError = 'MongoServerError';
const errName = 'Error';
const errIllegalArgsPattern = /^Illegal arguments: /;
const errDuplicateKeyPattern = /^E11000 duplicate key error collection: /;

/* Miscellaneous consts */
const pswSoltLen = 12;

module.exports = {
  PORT,
  USERS,
  MOVIES,
  MONGODB,
  NODE_ENV,
  envProduction,
  reqLogFName,
  errLogFName,
  dbgFlag,
  trcFlag,
  dbgNoCORSFlag,
  dbgNoAuthFlag,
  dbgNoLogFlag,
  trcMoviesFlag,
  trcSchValidateFlag,
  errTraceFlag,
  userDirs,
  movieDirs,
  userRoutes,
  movieRoutes,
  signInRoute,
  signUpRoute,
  strSchMinLen,
  strSchMaxLen,
  idSchemaLen,
  strSchPassLen,
  emailPattern,
  urlValidOptions,
  usrEmailFailMsg,
  linkFailMsg,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
  TOKEN_KEY,
  tokenDuration,
  authHeaderPattern,
  authNeedMsg,
  idPattern,
  linkPattern,
  resOkDefault,
  resOKCreated,
  errIncorrectData,
  errAuth,
  errForbidden,
  errNotFound,
  errEmailExists,
  errDefault,
  errCastErr,
  errValidationErr,
  errMongoServerError,
  errName,
  errIllegalArgsPattern,
  errDuplicateKeyPattern,
  pswSoltLen,
};

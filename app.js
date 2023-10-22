const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const auth = require('./middlewares/auth');
const { signInJoiTest, signUpJoiTest } = require('./middlewares/joiValidate');
const errHandle = require('./middlewares/errHandle');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rootRouter = require('./routes/index');
// const userRouter = require('./routes/users');
// const movieRouter = require('./routes/movies');
const {
  PORT, /* USERS, MOVIES, */NODE_ENV, MONGODB, envProduction, DEFAULT_ALLOWED_METHODS, allowedCors,
  signInRoute, signUpRoute, errNotFound, dbgFlag, dbgNoCORSFlag, dbgNoAuthFlag, dbgNoLogFlag,
  trcFlag, errTraceFlag, logFlag, logErrsFlag,
} = require('./utils/constants');
const { logger, logPassLint } = require('./utils/miscutils');
const { login, createUser } = require('./controllers/users');

const app = express();
mongoose.connect(MONGODB, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => logger(req, res, next));
/* ------ CORS middleware starts ------------ */
if (!dbgFlag || !dbgNoCORSFlag || NODE_ENV === envProduction) {
  app.use((req, res, next) => {
    const { origin } = req.headers; // Сохраняем источник запроса
    const { method } = req; // Сохраняем тип запроса (HTTP-метод)
    const requestHeaders = req.headers['access-control-request-headers'];
    // сохраняем список заголовков исходного запроса

    /* console.log(`${new Date().toLocaleString('ru-RU')} Origin: ${origin} / method:
    ${method} / req headers: ${requestHeaders}`); */
    res.header('Access-Control-Allow-Origin', '*'); // allow all requests, del after debug end
    if (allowedCors.includes(origin)) { // проверяем, что источник запроса есть среди разрешённых
      /* console.log(`${new Date().toLocaleString('ru-RU')} Request ${origin} is allowed:
      ${allowedCors.includes(origin)}`); */
      res.header('Access-Control-Allow-Origin', origin);
      // устанавливаем заголовок, разрешающий запросы с этого источника
    }
    if (method === 'OPTIONS') { // Для предварительного запроса, добавляем нужные заголовки
      /* console.log
      (`${new Date().toLocaleString('ru-RU')} Methods 4 preflights: ${requestHeaders}`); */
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS); // разрешаем кросс-доменные запросы любых типов (по умолчанию)
      res.header('Access-Control-Allow-Headers', requestHeaders); // разрешаем кросс-доменные запросы с этими заголовками
      return res.end(); // завершаем обработку запроса и возвращаем результат клиенту
    }
    return next();
  });
}
/* ------ CORS middleware ends ------------ */
// логгер запросов
if (logFlag && (!dbgFlag || !dbgNoLogFlag || NODE_ENV === envProduction)) app.use(requestLogger);
app.post(signInRoute, signInJoiTest(), login);
app.post(signUpRoute, signUpJoiTest(), createUser);

// роуты, которым нужна авторизация:
if (!dbgFlag || !dbgNoAuthFlag || NODE_ENV === envProduction) app.use(auth);
app.use('/', rootRouter);
// app.use(USERS, userRouter);
// app.use(MOVIES, movieRouter);
app.patch('/*', (req, res) => {
  if (trcFlag && NODE_ENV !== envProduction) logPassLint(`App path not found: ${Object.entries(req).join('/')}`, errTraceFlag);
  try {
    throw new Error("Path 2 be processed doesn't exist");
  } catch (err) {
    logPassLint(`${new Date().toLocaleString('ru-RU')} Error ${errNotFound.num}: ${err}`, errTraceFlag);
    res.status(errNotFound.num).send({ message: errNotFound.msg });
  }
});
// логгер ошибок:
if (logErrsFlag && (!dbgFlag || !dbgNoLogFlag || NODE_ENV === envProduction)) app.use(errorLogger);
app.use(errors());
app.use(errHandle);
app.listen(PORT, () => {
  logPassLint(`${new Date().toLocaleString('ru-RU')} App ${NODE_ENV} mode listening on port ${PORT}`, true);
});

module.exports.createMovie = (req) => {
  logPassLint(req.user._id, true);
};

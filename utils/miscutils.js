const {
  errIncorrectData, errNotFound, errDefault, errCastErr, errName, logFlag,
} = require('./constants');

/* Miscellaneous procedures (which haven't refed result) */
const logPassLint = (
  msg,
  logPassFlag = false,
  msgLog = (msg2Log = msg, log2Flag = logPassFlag) => { if (log2Flag) console.log(msg2Log); },
) => msgLog(msg, logPassFlag);

function handleIdErr(res, err) {
  if (err.name === errCastErr) {
    logPassLint(`Error ${errIncorrectData.num}: ${err}`, true);
    res.status(errIncorrectData.num).send({ message: errIncorrectData.msg });
  } else if (err.name === errName && err.message === errNotFound.msg) {
    logPassLint(`Error ${errNotFound.num}: ${err}`, true);
    res.status(errNotFound.num).send({ message: errNotFound.msg });
  } else {
    logPassLint(err, true);
    res.status(errDefault.num).send({ message: err });
  }
}

/* Router common consts */
const logger = (req, res, next, logTraceFlag = logFlag, logTraceMsg = `${new Date().toLocaleString('ru-RU')} Request is logged on`) => {
  logPassLint(logTraceMsg, logTraceFlag);
  next();
};

module.exports = {
  logger,
  logPassLint,
  handleIdErr,
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02"||err.code === "23502") {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.msg) {
    res.status(err.status).send({ msg: "Not Found" });
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

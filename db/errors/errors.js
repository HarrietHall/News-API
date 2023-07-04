exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "Bad Request" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Not Found" });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.msg === "Not Found") {
    res.status(err.status).send({ msg: "Not Found" });
  } else if (err.msg === "Bad request") {
    res.status(err.status).send({ msg: "Bad request" });
  }
  next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

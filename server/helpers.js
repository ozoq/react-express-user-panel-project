const respondWithStatusJson =
  (status) =>
  (res) =>
  (message = "", data = {}) =>
    res.json({
      status,
      message,
      data,
    });

function handleSyntaxErrors(err, req, res, next) {
  if (err instanceof SyntaxError) {
    return respondWithStatusJson("failure")(res)("Syntax error");
  }
  next(err);
}

function authorized(req, res, next) {
  if (!req.user) {
    return res.failure("Your account has probably been deleted");
  }
  if (req.user.isBlocked) {
    return res.failure("Your used was blocked");
  }
  next();
}

module.exports = {
  respondWithStatusJson,
  handleSyntaxErrors,
  authorized,
};

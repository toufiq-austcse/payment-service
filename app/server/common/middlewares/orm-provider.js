function includeOrm(orm) {
  return (req, res, next) => {
    req.orm = orm;
    next();
  };
}

module.exports = {
  includeOrm,
};

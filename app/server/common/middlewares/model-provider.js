function includeModel(model) {
  return (req, res, next) => {
    req.model = model;
    next();
  };
}

module.exports = {
  includeModel,
};

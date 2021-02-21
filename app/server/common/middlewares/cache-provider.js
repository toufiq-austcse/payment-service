function includeCacheDb(cacheDb) {
  return (req, res, next) => {
    req.cacheDb = cacheDb;
    next();
  };
}

module.exports = {
  includeCacheDb,
};

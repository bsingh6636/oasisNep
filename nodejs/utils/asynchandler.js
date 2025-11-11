const asyncErrorHandler = (TheFunction) => (req, res, next) => {
  Promise.resolve(TheFunction(req, res, next)).catch(next);
};

export default asyncErrorHandler;

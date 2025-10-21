const requestLogger = (req, res, next) => {
  const logData = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    ip: req.ip || req.connection.remoteAddress,
    referrer: req.headers.referer || req.headers.referrer,
    cookies: req.cookies,
    headers: req.headers,
    params: req.params,
    query: req.query,
    body: req.body,
  };

  // Add user info if available (assuming authentication middleware adds it to req.user)
  if (req.user) {
    logData.user = req.user;
  }

  console.log(JSON.stringify(logData, null, 2));

  next();
};

export default requestLogger;

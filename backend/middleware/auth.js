const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = req.headers.authorization.split(' ')[0];
    console.log('token = ', token);
    console.log('user = ', user);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log('userId = ', userId);
    if (!user || user !== userId) {
      console.log("ACCEES REFUSE");
      throw 'Invalid user ID';
    } else {
      console.log("ACCEES ACCORDE");
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
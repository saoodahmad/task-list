const jwt = require('jsonwebtoken');
const ErrorResponse = require('../error-handler/errorResponse');
const { fetchUserById } = require('../services/auth');
exports.requireTokenVerification = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await fetchUserById(decoded.id);

      if (!user) {
        next(new ErrorResponse('User not found', 401));
      }
      req.user = user;
      next();
    } catch (error) {
      next(new ErrorResponse('Not Authorised', 401));
    }
  } else {
    next(new ErrorResponse('Not Authorised', 401));
  }
};

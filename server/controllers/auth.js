const ErrorResponse = require('../error-handler/errorResponse');
const { fetchUserByEmail, createUser } = require('../services/auth');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await fetchUserByEmail(email);
  if (!user) {
    return next(new ErrorResponse('Email or Password is incorrect', 401));
  }

  const passwordMatch = await user.matchPasswords(password);

  if (!passwordMatch) {
    return next(new ErrorResponse('Email or Password is incorrect', 401));
  }
  res.status(200).json({
    success: true,
    message: 'Login Success!',
    token: user.getSignedToken(),
  });
};

exports.register = async (req, res, next) => {
  const { email, password, name, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(
      new ErrorResponse('Password and confirm password do not match', 400)
    );
  }
  let user;

  user = await fetchUserByEmail(email);

  if (user) {
    return next(new ErrorResponse('User ALready Exists!', 400));
  }

  user = await createUser(email, password, name);

  res.status(201).json({
    success: true,
    message: 'Registration Success!',
    token: user.getSignedToken(),
  });
};

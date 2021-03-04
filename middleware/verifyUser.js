const jwt = require('jsonwebtoken');
require('dotenv').config(); // This needs to be there so that the env-file can be read for the secretKey i have down bellow

// This is used for routes that recuire a logged in user to be accessed
const verifiedToken = (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token) return res.render('loginPage.ejs', { err: 'Du måste logga in för att få återkosmt ' });
  const verified = jwt.verify(token, process.env.privateSecretKey);
  req.header = verified;
  next();
};

module.exports = verifiedToken;

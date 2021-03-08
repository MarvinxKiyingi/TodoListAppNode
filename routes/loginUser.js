const Router = require('express').Router();
const User = require('../model/user');
const chalk = require('chalk');
var path = require('path');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

Router.get('/login', async (req, res) => {
  try {
    res.render('loginPage.ejs', { err: '' });
  } catch (err) {
    console.log(err);
  }
});

Router.post('/login', async (req, res) => {
  // FETCHING THE INFROMATION TYPED IN BY THE USER
  const emailTypedByUser = req.body.Email;
  const passwordTypedByUser = req.body.Password;
  const user = await User.findOne({ Email: emailTypedByUser });
  try {
    // VALIDATING USER
    if (!user) {
      return res.render('loginPage.ejs', { err: 'Email or password is invalid' }); // error medelande för username
    }
    // VALIDATING PASSWORD
    const validUser = await bcrypt.compare(passwordTypedByUser, user.Password);
    if (!validUser) {
      return res.render('loginPage.ejs', { err: 'Email or password is invalid' }); // error medelande för password
    }
    // VALIDATING TOKEN
    const jwtToken = await jwt.sign({ Email: user }, process.env.privateSecretKey);
    if (jwtToken) {
      const cookie = req.cookies.jwtToken;
      if (!cookie) {
        res.cookie('jwtToken', jwtToken, { maxAge: 3600000, httpOnly: true });
      }
      return res.redirect('/');
    }
  } catch (err) {
    console.log(chalk.hex('#ff073a').bold('Something went wrong from file: ' + path.basename(__filename) + ' on the Post-request'));
    return res.redirect('/login');
  }
});

module.exports = Router;

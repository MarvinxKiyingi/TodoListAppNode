const Router = require('express').Router();
const User = require('../model/user');
const chalk = require('chalk');
var path = require('path');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

Router.get('/login', async (req, res) => {
  try {
    res.render('loginPage.ejs', { err: ' ' });
  } catch (err) {
    res.render('loginPage.ejs', { err: ' ' });
    console.log(err);
  }
});

Router.post('/login', async (req, res) => {
  try {
    const emailTypedByUser = req.body.Email;
    const passwordTypedByUser = req.body.Password;

    const user = await User.findOne({ Email: emailTypedByUser });
    if (!user) {
      return res.render('loginPage.ejs', { err: 'Användare finns inte ' }); // hur skickar jag med ett felmedelande
    }

    const validUser = await bcrypt.compare(passwordTypedByUser, user.Password);
    console.log(validUser);
    if (!validUser) {
      return res.render('loginPage.ejs', { err: ' ' });
    }
    const jwtToken = await jwt.sign({ Email: user }, process.env.privateSecretKey);
    if (jwtToken) {
      const cookie = req.cookies.jwtToken;
      if (!cookie) {
        res.cookie('jwtToken', jwtToken, { maxAge: 3600000, httpOnly: true });
      }
      console.log(user.Name); // This is used to find the name of the user
      return res.redirect('/');
    }
  } catch (err) {
    console.log(chalk.hex('#ff073a').bold('Something went wrong from file: ' + path.basename(__filename) + ' on the Post-request'));
    console.log(err);
    return res.redirect('/login');
  }
});

module.exports = Router;

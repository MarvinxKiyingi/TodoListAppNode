const Router = require('express').Router();
const User = require('../model/user');
const chalk = require('chalk');
var path = require('path');
var bcrypt = require('bcrypt');

Router.get('/register', async (req, res) => {
  res.render('registerPage.ejs');
});

Router.post('/register', async (req, res) => {
  try {
    // FETCHING THE INFROMATION TYPED IN BY THE USER
    const nameTypedByUser = req.body.Name;
    const emailTypedByUser = req.body.Email;
    const passwordTypedByUser = req.body.Password;

    // HASING THE USERS PASSWORD WITH THE HELP OFF bcrypt
    const hashedPassword = await bcrypt.hash(passwordTypedByUser, 8);

    // CREATING A NEW USER IN THE DATABASE AND SAVING IT.
    const newUser = await new User({ Name: nameTypedByUser, Email: emailTypedByUser, Password: hashedPassword });
    newUser.save().then(() => {
      console.log(chalk.hex('#39ff14').bold('Successfully added a User from file: ' + path.basename(__filename)));
      res.redirect('/login');
    });
  } catch {
    res.redirect('/register');
    console.log(chalk.hex('#39ff14').bold('Something went wrong from file: ' + path.basename(__filename)));
  }
});

module.exports = Router;

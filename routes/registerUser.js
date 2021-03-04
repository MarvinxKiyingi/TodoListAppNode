const Router = require('express').Router();
const User = require('../model/user');
const chalk = require('chalk');
var path = require('path');
var bcrypt = require('bcryptjs');

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
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(passwordTypedByUser, salt);

    const emailAlreadyExist = await User.findOne({ emailTypedByUser });
    if (emailAlreadyExist) {
      return res.render('registerPage.ejs');
    }

    // CREATING A NEW USER IN THE DATABASE AND SAVING IT.
    const newUser = await new User({ Name: nameTypedByUser, Email: emailTypedByUser, Password: hashedPassword });
    newUser.save().then(() => {
      console.log(chalk.hex('#39ff14').bold('Successfully added a User from file: ' + path.basename(__filename)));
      return res.redirect('/login');
    });
  } catch (err) {
    console.log(chalk.hex('#ff073a').bold('Something went wrong from file: ' + path.basename(__filename)));
    console.log(err);
    return res.redirect('/register');
  }
});

module.exports = Router;

const Router = require('express').Router();
const User = require('../model/user');
const chalk = require('chalk');
var path = require('path');
var bcrypt = require('bcryptjs');

Router.get('/register', async (req, res) => {
  try {
    res.render('registerPage.ejs', { err: '' });
  } catch (err) {
    console.log(err);
  }
});

Router.post('/register', async (req, res) => {
  // FETCHING THE INFROMATION TYPED IN BY THE USER
  const nameTypedByUser = req.body.Name;
  const emailTypedByUser = req.body.Email;
  const passwordTypedByUser = req.body.Password;

  const userName = await User.findOne({ Name: nameTypedByUser });
  const userEmail = await User.findOne({ Email: emailTypedByUser });

  try {
    if (userName || userEmail) {
      res.render('registerPage.ejs', { err: 'Username or email already exist' });
    } else {
      // HASING THE USERS PASSWORD WITH THE HELP OFF bcrypt
      const salt = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(passwordTypedByUser, salt);

      //   // CREATING A NEW USER IN THE DATABASE AND SAVING IT.
      const newUser = new User({ Name: nameTypedByUser, Email: emailTypedByUser, Password: hashedPassword });
      newUser.save();
      console.log(chalk.hex('#39ff14').bold('Successfully added a User from file: ' + path.basename(__filename)));
      return res.redirect('/login');
    }
  } catch (err) {
    console.log(chalk.hex('#ff073a').bold('Something went wrong from file: ' + path.basename(__filename) + ' on the Post-request'));
  }
});

module.exports = Router;

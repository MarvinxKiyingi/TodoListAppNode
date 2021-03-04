const Router = require('express').Router();
const User = require('../model/user');
const chalk = require('chalk');
var path = require('path');

Router.get('/signout', async (req, res) => {
  res.clearCookie('jwtToken');
  res.redirect('/login');
});

module.exports = Router;

const Router = require('express').Router();
const User = require('../model/user');
const chalk = require('chalk');
var path = require('path');

Router.get('/login', async (req, res) => {
  res.render('loginPage.ejs');
});

Router.post('/login', (req, res) => {
  res.render('loginPage.ejs');
});

module.exports = Router;

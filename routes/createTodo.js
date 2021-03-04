const Router = require('express').Router();
const chalk = require('chalk');
const Todo = require('../model/Todo');
var path = require('path');
const reqLogedinUser = require('../middleware/verifyUser');

// Create oporation
Router.post('/', reqLogedinUser, async (req, res) => {
  const sortByDate = +req.query.sorted || 1;
  const page = +req.query.page || 1;
  try {
    // res.render('index.ejs', { name: req.header.Email.Name });
    const fromForm = req.body.Name; // Här är namnet detsamma som formuläret
    const newTodo = await new Todo({ Name: fromForm }); // Här kopplar jag samman formuläret med databasen.

    newTodo.save().then(() => {
      console.log(chalk.hex('#39ff14').bold('Successfully added a todo from file: ' + path.basename(__filename)));
      return res.redirect(`/?page=${page}&&sorted=${sortByDate}`);
    });
  } catch (err) {
    return console.log(chalk.hex('#f000ff').bold('Something went wrong from file: ' + path.basename(__filename) + err));
  }
});

module.exports = Router;

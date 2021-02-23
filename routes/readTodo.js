const Router = require('express').Router();
const chalk = require('chalk');
const Todo = require('../model/Todo');
var path = require('path');

// Read operation
Router.get('/', async (req, res) => {
  const sortByDate = +req.query.sorted || 1; // req.query.sorted = användarens värde 1= är det vi har hårdkodat.
  const page = +req.query.page || 1;

  try {
    const totalTodos = await Todo.find().countDocuments();

    const amountToShowPerReq = 4;

    const totalTodoPages = Math.ceil(totalTodos / amountToShowPerReq);

    const amountShown = amountToShowPerReq * page;

    const dataFromDB = await Todo.find().limit(amountShown).sort({ Date: sortByDate }); // Här tankar vi ner det som finns i data basem meh hjälp av find och Todo-model:en
    res.render('index.ejs', { dataFromDB: dataFromDB, totalTodos, totalTodoPages, amountShown, amountToShowPerReq, page, sortByDate });
  } catch (err) {
    return console.log(chalk.hex('#f000ff').bold('Something went wrong from file: ' + path.basename(__filename) + err));
  }
});

module.exports = Router;

const Router = require('express').Router();
const chalk = require('chalk');
const Todo = require('../model/Todo');
var path = require('path');

// Update operations
Router.get('/editToDo/:id/', async (req, res) => {
  const sortByDate = +req.query.sorted || 1;
  const page = +req.query.page || 1;
  try {
    const toBeEdited = req.params.id;

    const totalTodos = await Todo.find().countDocuments();

    const amountToShowPerReq = 4;

    const totalTodoPages = Math.ceil(totalTodos / amountToShowPerReq);

    const amountShown = amountToShowPerReq * page;

    const TodoFromDB = await Todo.find().limit(amountShown).sort({ Date: sortByDate });
    res.render('edit.ejs', { TodoFromDB: TodoFromDB, toBeEdited, totalTodos, totalTodoPages, amountShown, amountToShowPerReq, page, sortByDate });
    Router.post('/editTodo/:id/', async (req, res) => {
      const changedTodo = await Todo.updateOne({ _id: req.params.id }, { Name: req.body.Name });
      console.log(chalk.hex('#ffe700').bold('Updated a todo Successfully'));
      res.redirect(`/?page=${page}&&sorted=${sortByDate}`);
    });
  } catch (err) {
    return console.log(chalk.hex('#f000ff').bold('Something went wrong from file: ' + path.basename(__filename) + err));
  }
});
module.exports = Router;

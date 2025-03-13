const { Command } = require("commander");
const { program } = require("commander");
const path = require("path");

const addTask = require("./addTaskCommand");
const listTasks = require("./listTaskCommand");
const deleteTask = require("./deleteTaskCommand");
const updateTask = require("./updateTaskCommand");
const statusDone = require("./statusDoneCommand");
const statusInProgress = require("./statusInProgressCommand");
const statusTodo = require(a"./statusTodoCommand");

program
  .name("task-tracker")
  .description("Task Tracker is a CLI tool for managing tasks")
  .version("1.0.0");

program.addCommand(addTask);
program.addCommand(listTasks);
program.addCommand(deleteTask);
program.addCommand(updateTask);
program.addCommand(statusDone);
program.addCommand(statusInProgress);
program.addCommand(statusTodo);

program.parse(process.argv);

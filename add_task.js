const { Command } = require("commander");
const fs = require("fs");
const path = require("path");

const tasksFile = path.join(__dirname, "tasks.json");

function addTask(description) {
  if (!description) {
    console.error("Task description is required");
    process.exit(1);
  }

  let tasks = [];
  if (fs.existsSync(tasksFile)) {
    tasks = JSON.parse(fs.readFileSync(tasksFile, "utf-8"));
  }

  tasks.push({ description });
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
  console.log("Task added successfully");
}

const program = new Command();
program
  .command("add <description>")
  .description("Add a task to the task list")
  .action(addTask);

program.parse(process.argv);

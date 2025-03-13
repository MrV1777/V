const { Command } = require("commander");
const fs = require("fs");
const path = require("path");

const tasksFile = path.join(__dirname, "tasks.json");

function deleteTask(taskID) {
  if (!taskID) {
    console.error("Please provide a task ID");
    process.exit(1);
  }

  let tasks = [];
  if (fs.existsSync(tasksFile)) {
    tasks = JSON.parse(fs.readFileSync(tasksFile, "utf-8"));
  }

  const index = parseInt(taskID, 10) - 1;
  if (isNaN(index) || index < 0 || index >= tasks.length) {
    console.error("Invalid task ID");
    process.exit(1);
  }

  tasks.splice(index, 1);
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
  console.log("Task deleted successfully");
}

const program = new Command();
program
  .command("delete <taskID>")
  .description("Delete a task by providing the task ID")
  .action(deleteTask);

program.parse(process.argv);

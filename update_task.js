const { Command } = require("commander");
const fs = require("fs");
const path = require("path");

const tasksFile = path.join(__dirname, "tasks.json");

function updateTask(taskID, newDescription) {
  if (!taskID || !newDescription) {
    console.error("Please provide a task ID and the new description");
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

  tasks[index].description = newDescription;
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
  console.log("Task updated successfully");
}

const program = new Command();
program
  .command("update <taskID> <newDescription>")
  .description("Update a task by providing the task ID and the new description")
  .action(updateTask);

program.parse(process.argv);

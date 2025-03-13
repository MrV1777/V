const { Command } = require("commander");
const fs = require("fs");
const path = require("path");

const tasksFile = path.join(__dirname, "tasks.json");

function listTasks(status = "all") {
  if (!fs.existsSync(tasksFile)) {
    console.log("No tasks found.");
    return;
  }

  const tasks = JSON.parse(fs.readFileSync(tasksFile, "utf-8"));
  let filteredTasks = tasks;

  if (status !== "all") {
    filteredTasks = tasks.filter((task) => task.status === status);
  }

  if (filteredTasks.length === 0) {
    console.log("No tasks match the given status.");
    return;
  }

  console.log("Tasks:");
  filteredTasks.forEach((task, index) => {
    console.log(
      `${index + 1}. [${task.status || "pending"}] ${task.description}`
    );
  });
}

const program = new Command();
program
  .command("list [status]")
  .description("List all tasks. Optionally filter by status")
  .action(listTasks);

program.parse(process.argv);

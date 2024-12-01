#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import boxen from "boxen";
import figlet from "figlet";

// Data for the options
const options = {
  "About Me":
    "Hi! I'm a software developer passionate about creating intuitive applications.",
  Experience:
    "I have worked on multiple projects, including mobile apps, web apps, and backend systems.",
  "Tech Stack":
    "JavaScript, TypeScript, React, Node.js, Express, MongoDB, and more.",
  "Contact Info":
    "Email: me@example.com\nGitHub: https://github.com/harshsharma20503",
  Exit: "Thank you for using the app! Goodbye! 👋",
};

// Function to display the welcome message
const showWelcome = () => {
  console.log(
    chalk.blueBright.bold(
      figlet.textSync("Welcome!", { horizontalLayout: "full" })
    )
  );
};

// Function to display options and handle responses
const showMenu = async () => {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Choose an option:",
      choices: Object.keys(options),
    },
  ]);

  if (choice === "Exit") {
    console.log(
      boxen(chalk.yellow(options[choice]), {
        padding: 1,
        margin: 1,
        borderStyle: "double",
        borderColor: "yellow",
      })
    );
    process.exit(0); // Gracefully exit the program
  }

  // Display the selected option in a card-like box
  console.log(
    boxen(chalk.green(options[choice]), {
      padding: 1,
      margin: 1,
      borderStyle: "double",
      borderColor: "cyan",
    })
  );

  // Ask again
  showMenu();
};

// Main function
const main = () => {
  showWelcome();
  showMenu();
};

// Start the application
main();

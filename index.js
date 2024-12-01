#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import boxen from "boxen";
import figlet from "figlet";
import clear from "clear";

// Get terminal dimensions
const getTerminalSize = () => ({
  width: process.stdout.columns || 80,
  height: process.stdout.rows || 24,
});

// Creates a centered box with specified content and styling
const createBox = (content, color, title = "") => {
  // Calculate the width of the content
  const contentWidth = Math.max(
    ...content.split("\n").map((line) => line.length)
  );
  // Add padding, borders, and margin to get total box width
  const totalBoxWidth = contentWidth + 4; // 2 for padding + 2 for borders

  // Get terminal width
  const { width: terminalWidth } = getTerminalSize();

  // Calculate left margin to center the box
  const marginLeft = Math.max(
    0,
    Math.floor((terminalWidth - totalBoxWidth) / 2)
  );

  return boxen(chalk[color](content), {
    padding: 1,
    margin: {
      top: 1,
      bottom: 1,
      left: marginLeft,
      right: marginLeft,
    },
    borderStyle: "double",
    borderColor: color,
    title: title,
    titleAlignment: "center",
    textAlignment: "center",
    float: "center",
  });
};

// Display welcome message
const showWelcome = () => {
  const welcomeText = figlet.textSync("Welcome!", {
    font: "Standard",
    horizontalLayout: "full",
  });
  console.log(createBox(welcomeText, "cyan", "✨ My Portfolio ✨"));
};

// Portfolio content
const portfolioContent = {
  "About Me": {
    content: `Hello, my name is Harsh Sharma. I am a final-year BTech student with an interest in coding and feel very lucky to have been offered a software engineer role at Google. I have built a few personal projects and enjoy solving DSA/CP problems every now and then. I love outdoor sports and am up for any challengers anytime (unless it’s some kind of martial arts, and I’m going to get beaten up).`,
    color: "green",
  },
  "My Experience": {
    content: `🏢 Technology Intern at Fidelity International (June-July 2024)
• Developed a POC of custodial crypto wallet by reverse engineering metamask and metamask institutional.
• Implemented a IAM like dashboard using MERN Stack for access control over keys and every transaction.
• Documented the entire reverse engineering process with architecture diagram and the codebase for future reference.

🏢 Teaching Assistant at Ask Senior (Sept-Oct 2023)
• Provided guidance and resolved DSA/CP-related doubts
• Served as a mentor and fostered a collaborative learning environment.
• Provided feedback to improve the course and enhance learning outcomes.`,
    color: "yellow",
  },
  "Tech Stack I know": {
    content: `${chalk.blue("Frontend")}:  React.js  |  TypeScript  |  HTML5/CSS3
${chalk.green("Backend")}:   Node.js  |  Express | Firebase 
${chalk.red("Database")}:  MongoDB  |  PostgreSQL  |  SQLite
${chalk.magenta("DevOps")}:    GitHub  |  Docker  |  CI/CD  |  Jenkins
${chalk.yellow("Tools")}:     Git  |  Jira  |  Postman  |  VS Code`,
    color: "blue",
  },
  "My Coding Profiles": {
    content: `🏆 LeetCode: ${chalk.cyan("https://leetcode.com/xoxoharsh/")}
    Max Rating: 1962 | Problems Solved: 680+

⭐ CodeForces: ${chalk.cyan("https://codeforces.com/profile/XoXoHarsh")}
    Max Rating: 1556 | Problem Solved: 500+

🌟 GeeksForGeeks: ${chalk.cyan(
      "https://www.geeksforgeeks.org/user/harshsharma20503/"
    )}
    Problem Solved: 250+ 

💻 HackerRank: ${chalk.cyan(
      "https://www.hackerrank.com/profile/harshsharma20503"
    )}
    6⭐ in Problem Solving | 5⭐ in C++`,
    color: "magenta",
  },
  "Contact Info": {
    content: `📧 Email: ${chalk.cyan("harshsharma20503@gmail.com")}
🔗 LinkedIn: ${chalk.cyan("https://www.linkedin.com/in/harshsharma20503/")}
🐙 GitHub: ${chalk.cyan("https://github.com/HarshSharma20503/")}

${chalk.italic("Fun fact: I can debug faster than a rubber duck! 🦆")}`,
    color: "red",
  },
  Exit: {
    content:
      "Thanks for checking out my portfolio! May your code be bug-free! 👋",
    color: "yellow",
  },
};

// Show menu and handle selection
const showMenu = async () => {
  // Add some vertical spacing before the menu
  console.log("\n");

  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Choose an option:",
      choices: Object.keys(portfolioContent),
      // Center the menu using padding
      prefix: " ".repeat(Math.floor(getTerminalSize().width / 4)),
    },
  ]);

  clear();

  if (choice === "Exit") {
    console.log(
      createBox(
        portfolioContent[choice].content,
        portfolioContent[choice].color
      )
    );
    process.exit(0);
  }

  console.log(
    createBox(
      portfolioContent[choice].content,
      portfolioContent[choice].color,
      choice
    )
  );
  showMenu();
};

// Main function
const main = () => {
  clear();
  showWelcome();
  showMenu();
};

// Start the application
main();

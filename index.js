#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import boxen from "boxen";
import figlet from "figlet";
import clear from "clear";

// Centers text based on terminal width
const centerText = (text) => {
  const terminalWidth = process.stdout.columns || 80;
  const textWidth = text.length;
  const padding = Math.max(0, Math.floor((terminalWidth - textWidth) / 2));
  return " ".repeat(padding) + text;
};

// Creates a centered box with specified content and styling
const createBox = (content, color, title = "") => {
  return boxen(chalk[color](content), {
    padding: 1,
    margin: 1,
    borderStyle: "double",
    borderColor: color,
    title: title,
    titleAlignment: "center",
    textAlignment: "center",
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
    content: `I am a passionate software developer with a keen interest in building scalable applications 
and solving complex problems. I love to explore new technologies and contribute to open-source projects. 
When I'm not coding, you can find me reading tech blogs or playing chess!`,
    color: "green",
  },
  "My Experience": {
    content: `🏢 Senior Developer at TechCorp (2022-Present)
• Led development of a cloud-based inventory management system
• Implemented real-time analytics dashboard using React and Node.js
• Reduced system response time by 40%

🏢 Software Engineer at InnovateSoft (2020-2022)
• Developed microservices architecture for e-commerce platform
• Created automated testing pipeline reducing deployment time by 60%
• Mentored junior developers and conducted code reviews`,
    color: "yellow",
  },
  "Tech Stack I know": {
    content: `${chalk.blue(
      "Frontend"
    )}:  React.js  |  Vue.js  |  TypeScript  |  HTML5/CSS3
${chalk.green("Backend")}:   Node.js  |  Express  |  Django  |  FastAPI
${chalk.red("Database")}:  MongoDB  |  PostgreSQL  |  Redis
${chalk.magenta("DevOps")}:    Docker  |  Kubernetes  |  AWS  |  CI/CD
${chalk.yellow("Tools")}:     Git  |  Jira  |  Postman  |  VS Code`,
    color: "blue",
  },
  "My Coding Profiles": {
    content: `🏆 LeetCode: ${chalk.cyan("https://leetcode.com/yourprofile")}
    Current Rating: 2100+ | Problems Solved: 500+

⭐ CodeForces: ${chalk.cyan("https://codeforces.com/profile/yourhandle")}
    Max Rating: 1800 | Division: 1

🌟 GeeksForGeeks: ${chalk.cyan(
      "https://auth.geeksforgeeks.org/user/yourprofile"
    )}
    Institution Rank: #5 | Total Score: 2500+

💻 HackerRank: ${chalk.cyan("https://www.hackerrank.com/yourprofile")}
    5⭐ in Problem Solving | 4⭐ in Python`,
    color: "magenta",
  },
  "Contact Info": {
    content: `📧 Email: ${chalk.cyan("your.email@example.com")}
🔗 LinkedIn: ${chalk.cyan("https://linkedin.com/in/yourprofile")}
🐙 GitHub: ${chalk.cyan("https://github.com/yourusername")}

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
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Choose an option:",
      choices: Object.keys(portfolioContent),
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

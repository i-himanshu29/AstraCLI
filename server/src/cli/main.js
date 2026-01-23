#!/usr/bin/env node

import dotenv from "dotenv";
import chalk from "chalk";
import figlet from "figlet";

import { Command } from "commander";

import { login } from "./commands/auth/login.js";
import { logout } from "./commands/auth/logout.js";
import { whoami } from "./commands/auth/whoami.js";
import { wakeUp } from "./commands/ai/wakeup.js";


dotenv.config();

async function main() {
  // Display banner
  console.log(
    chalk.cyan(
      figlet.textSync("Astra CLI", {
        font: "Standard",
        horizontalLayout: "default",
      })
    )
  );
  console.log(chalk.red("A Cli based AI tool \n"));

  const program = new Command("Astra");

  program
    .version("0.0.1")
    .description("Astra CLI - Device Flow Authentication");

  // Add commands
    program.addCommand(wakeUp);
    program.addCommand(login);
    program.addCommand(logout);
    program.addCommand(whoami);

  // Default action shows help
  program.action(() => {
    program.help();
  });

  program.parse();
}

main().catch((error) => {
  console.error(chalk.red("Error running Astra CLI:"), error);
  process.exit(1);
});

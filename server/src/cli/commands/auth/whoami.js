import { requireAuth } from "../../../lib/token.js";
import prisma from "../../../lib/db.js";
import chalk from "chalk";
import { Command } from "commander";
import { DEMO_URL } from "./login.js";

// ============================================
// WHOAMI COMMAND
// ============================================

export async function whoamiAction(opts) {
  const token = await requireAuth();
  if (!token?.access_token) {
    console.log("No access token found. Please login.");
    process.exit(1);
  }

  const user = await prisma.user.findFirst({
    where: {
      sessions: {
        some: {
          token: token.access_token,
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  // Output user session info
  console.log(
    chalk.bold.greenBright(`\n👤 User: ${user.name}
  📧 Email: ${user.email}
  👤 ID: ${user.id}`)
  );
}

// ============================================
// COMMANDER SETUP
// ============================================

export const whoami = new Command("whoami")
  .description("Show current authenticated user")
  .option("--server-url <url>", "The Better Auth server URL", DEMO_URL)
  .action(whoamiAction);

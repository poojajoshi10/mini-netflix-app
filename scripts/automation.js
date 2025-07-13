const { spawn, exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);

// Function to run a command and handle its output (for build)
async function runCommand(command, description) {
  console.log(`Starting task: ${description}`);
  try {
    const { stdout, stderr } = await execPromise(command);
    if (stdout) console.log(`[stdout] ${description}:`, stdout);
    if (stderr) console.error(`[stderr] ${description}:`, stderr);
    console.log(`Completed task: ${description}`);
  } catch (error) {
    console.error(`Error in task "${description}":`, error.message);
    throw error;
  }
}

// Function to spawn a dev server process (non-blocking)
function runDevServer(description) {
  console.log(`Starting task: ${description}`);
  const devProcess = spawn("npm", ["run", "dev"], { stdio: "inherit" });

  devProcess.on("error", (error) => {
    console.error(`Error in task "${description}":`, error.message);
    process.exit(1);
  });

  devProcess.on("close", (code) => {
    console.log(`Dev server exited with code ${code}`);
  });

  return devProcess;
}

// Main automation function
async function automate(task) {
  try {
    if (!task || task === "build") {
      await runCommand("npm run build", "Build minified distribution assets");
    }
    if (!task || task === "dev") {
      runDevServer("Start local server with watch");
      // Keep the script running to allow dev server to persist
      await new Promise(() => {});
    }
  } catch (error) {
    console.error("Automation failed:", error.message);
    process.exit(1);
  }
}

// Get command-line argument
const task = process.argv[2]; // e.g., 'dev' or 'build'
automate(task).catch((error) => {
  console.error("Script execution failed:", error.message);
  process.exit(1);
});

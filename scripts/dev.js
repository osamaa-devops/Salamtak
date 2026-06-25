import { spawn } from "child_process";

const isWindows = process.platform === "win32";
const npm = isWindows ? "npm.cmd" : "npm";

const processes = [
  spawn(npm, ["run", "backend:dev"], { stdio: "inherit" }),
  spawn(npm, ["run", "frontend:dev", "--", "--host", "0.0.0.0"], { stdio: "inherit" }),
];

let isShuttingDown = false;

function shutdown(code = 0) {
  if (isShuttingDown) return;
  isShuttingDown = true;
  processes.forEach((child) => {
    if (!child.killed) child.kill("SIGINT");
  });
  setTimeout(() => process.exit(code), 250);
}

processes.forEach((child) => {
  child.on("exit", (code, signal) => {
    if (!isShuttingDown && code && code !== 0) {
      console.error(`Dev process exited with ${signal || code}`);
      shutdown(code);
    }
  });
});

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

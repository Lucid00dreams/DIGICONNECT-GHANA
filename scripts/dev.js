const { spawn } = require("child_process");
const path = require("path");
const http = require("http");

const rootDir = path.resolve(__dirname, "..");
const backendDir = path.join(rootDir, "backend");
const frontendDir = path.join(rootDir, "frontend");

const isWin = process.platform === "win32";
const npmCmd = isWin ? "npm.cmd" : "npm";

console.log("\x1b[36m%s\x1b[0m", "=========================================================");
console.log("\x1b[1m\x1b[32m%s\x1b[0m", " 🇬🇭  DIGICONNECT GHANA — UNIFIED PLATFORM RUNNER");
console.log("\x1b[90m%s\x1b[0m", " \"Tech for Youth. Tech for Good.\"");
console.log("\x1b[36m%s\x1b[0m", "=========================================================");
console.log("\x1b[33m%s\x1b[0m", "Starting Backend API and Frontend Services...\n");

// Spawn Backend
const backend = spawn(npmCmd, ["run", "dev"], {
  cwd: backendDir,
  stdio: ["ignore", "pipe", "pipe"],
  shell: true,
  env: { ...process.env, FORCE_COLOR: "1" },
});

// Spawn Frontend
const frontend = spawn(npmCmd, ["run", "dev"], {
  cwd: frontendDir,
  stdio: ["ignore", "pipe", "pipe"],
  shell: true,
  env: { ...process.env, FORCE_COLOR: "1" },
});

function pipeOutput(stream, prefix, colorCode) {
  let buffer = "";
  stream.on("data", (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (line.trim()) {
        console.log(`${colorCode}${prefix}\x1b[0m ${line}`);
      }
    }
  });
  stream.on("end", () => {
    if (buffer.trim()) {
      console.log(`${colorCode}${prefix}\x1b[0m ${buffer}`);
    }
  });
}

pipeOutput(backend.stdout, "[Backend] ", "\x1b[35m");
pipeOutput(backend.stderr, "[Backend Err] ", "\x1b[31m");
pipeOutput(frontend.stdout, "[Frontend]", "\x1b[34m");
pipeOutput(frontend.stderr, "[Frontend Err]", "\x1b[33m");

let backendReady = false;
let frontendReady = false;

function checkBackend() {
  http.get("http://localhost:5000/api/health", (res) => {
    if (res.statusCode === 200 && !backendReady) {
      backendReady = true;
      checkAllReady();
    }
  }).on("error", () => {
    if (!backendReady) setTimeout(checkBackend, 800);
  });
}

function checkFrontend() {
  http.get("http://localhost:3000", (res) => {
    if ((res.statusCode === 200 || res.statusCode === 304 || res.statusCode === 307) && !frontendReady) {
      frontendReady = true;
      checkAllReady();
    }
  }).on("error", () => {
    if (!frontendReady) setTimeout(checkFrontend, 800);
  });
}

function checkAllReady() {
  if (backendReady && frontendReady) {
    console.log("\n\x1b[32m%s\x1b[0m", "=========================================================");
    console.log("\x1b[1m\x1b[32m%s\x1b[0m", " 🎉 PLATFORM READY & FULLY OPERATIONAL!");
    console.log("\x1b[32m%s\x1b[0m", "=========================================================");
    console.log("\x1b[1m%s\x1b[0m \x1b[36m%s\x1b[0m", " 🌐 Main Website:  ", "http://localhost:3000");
    console.log("\x1b[1m%s\x1b[0m \x1b[36m%s\x1b[0m", " 🔐 ConnectHub:    ", "http://localhost:3000/connecthub");
    console.log("\x1b[1m%s\x1b[0m \x1b[36m%s\x1b[0m", " 📡 Backend API:   ", "http://localhost:5000/api");
    console.log("\x1b[1m%s\x1b[0m \x1b[36m%s\x1b[0m", " 💚 Health Check:  ", "http://localhost:5000/api/health");
    console.log("\x1b[90m%s\x1b[0m", " Press Ctrl+C at any time to gracefully stop all services.\n");
  }
}

setTimeout(checkBackend, 1000);
setTimeout(checkFrontend, 1500);

function cleanup() {
  console.log("\n\x1b[33m%s\x1b[0m", "Shutting down DigiConnect Ghana services...");
  if (isWin) {
    if (backend.pid) spawn("taskkill", ["/pid", backend.pid.toString(), "/f", "/t"]);
    if (frontend.pid) spawn("taskkill", ["/pid", frontend.pid.toString(), "/f", "/t"]);
  } else {
    backend.kill("SIGTERM");
    frontend.kill("SIGTERM");
  }
  process.exit(0);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

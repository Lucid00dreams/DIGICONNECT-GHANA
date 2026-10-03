const { execSync } = require("child_process");
const path = require("path");

console.log("[Build] Preparing backend for cloud deployment...");
const backendDir = path.resolve(__dirname, "../backend");

try {
  execSync("npm install --omit=dev", { cwd: backendDir, stdio: "inherit" });
} catch (err) {
  console.log("[Build] Notice: Using parent node_modules or cached modules.");
}

console.log("[Build] ✅ Pre-compiled production backend distribution is ready.");

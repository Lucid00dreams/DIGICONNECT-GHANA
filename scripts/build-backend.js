const { execSync } = require("child_process");
const path = require("path");

console.log("[Build] Compiling backend TypeScript for cloud deployment...");
const backendDir = path.resolve(__dirname, "../backend");

try {
  execSync("npm run build", { cwd: backendDir, stdio: "inherit" });
  console.log("[Build] ✅ Backend TypeScript compiled successfully into dist/.");
} catch (err) {
  console.error("[Build] ❌ Backend build failed:", err.message);
  process.exit(1);
}

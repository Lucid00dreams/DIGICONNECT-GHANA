const path = require("path");

const backendDir = path.resolve(__dirname, "../backend");

// Switch process working directory to backend so all relative paths (db.json, uploads) resolve properly
process.chdir(backendDir);

console.log("[Start] Launching DigiConnect Ghana Production Backend API...");
console.log(`[Start] Working directory set to: ${process.cwd()}`);

// Require the compiled production server
require(path.join(backendDir, "dist", "server.js"));

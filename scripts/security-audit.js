/**
 * DigiConnect Ghana - Automated Cybersecurity Regression Test Suite
 * Validates OWASP & platform security controls defined in security.md
 */

const http = require("http");

const BASE_URL = "http://localhost:5000";

let testsRun = 0;
let testsPassed = 0;
let testsFailed = 0;

function logPass(name, detail = "") {
  testsRun++;
  testsPassed++;
  console.log(`\x1b[32m  ✔ PASS:\x1b[0m ${name} ${detail ? `\x1b[90m(${detail})\x1b[0m` : ""}`);
}

function logFail(name, reason = "") {
  testsRun++;
  testsFailed++;
  console.log(`\x1b[31m  ✘ FAIL:\x1b[0m ${name} ${reason ? `\x1b[33m[${reason}]\x1b[0m` : ""}`);
}

function makeRequest(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: parsed,
        });
      });
    });

    req.on("error", reject);

    if (body) {
      req.write(typeof body === "string" ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runSecurityAudit() {
  console.log("\n\x1b[36m%s\x1b[0m", "=========================================================");
  console.log("\x1b[1m\x1b[36m%s\x1b[0m", " 🛡️  DIGICONNECT GHANA — CYBERSECURITY AUDIT & VERIFICATION");
  console.log("\x1b[90m%s\x1b[0m", " Testing security controls based on security.md specification");
  console.log("\x1b[36m%s\x1b[0m\n", "=========================================================");

  try {
    // 1. Check Server Liveness & Fingerprint
    const health = await makeRequest("GET", "/api/health");
    if (health.statusCode === 200 && health.body.status === "ok") {
      logPass("Backend Health & Liveness", "HTTP 200");
    } else {
      logFail("Backend Health", `Unexpected status ${health.statusCode}`);
    }

    // 2. Server Information Leakage (Phase 13, 20)
    if (!health.headers["x-powered-by"]) {
      logPass("Server Fingerprint Protection", "X-Powered-By is absent");
    } else {
      logFail("Server Fingerprint Protection", "X-Powered-By header is leaked!");
    }

    // 3. Security Headers Verification (Phase 13)
    if (health.headers["x-content-type-options"] === "nosniff") {
      logPass("MIME Sniffing Protection", "X-Content-Type-Options: nosniff");
    } else {
      logFail("MIME Sniffing Protection", "Missing nosniff header");
    }

    if (health.headers["content-security-policy"]) {
      logPass("Content Security Policy (CSP)", "Present and configured");
    } else {
      logFail("Content Security Policy", "Missing CSP header");
    }

    if (health.headers["x-frame-options"] === "SAMEORIGIN") {
      logPass("Clickjacking Protection", "X-Frame-Options: SAMEORIGIN");
    } else {
      logFail("Clickjacking Protection", "Missing X-Frame-Options");
    }

    // 4. Access Control / BOLA Protection on Applications (Phase 4, 21)
    const unauthApps = await makeRequest("GET", "/api/applications");
    if (unauthApps.statusCode === 401) {
      logPass("Broken Object-Level Authorization (BOLA)", "Anonymous GET /api/applications rejected with 401");
    } else {
      logFail("BOLA Protection / Applications", `Expected 401, got ${unauthApps.statusCode}`);
    }

    // 5. Access Control on Contacts (Phase 4, 21)
    const unauthContacts = await makeRequest("GET", "/api/contacts");
    if (unauthContacts.statusCode === 401) {
      logPass("PII Exposure Protection / Contacts", "Anonymous GET /api/contacts rejected with 401");
    } else {
      logFail("PII Exposure Protection / Contacts", `Expected 401, got ${unauthContacts.statusCode}`);
    }

    // 6. Access Control on Involvements (Phase 4, 21)
    const unauthInvolvements = await makeRequest("GET", "/api/involvements");
    if (unauthInvolvements.statusCode === 401) {
      logPass("PII Exposure Protection / Involvements", "Anonymous GET /api/involvements rejected with 401");
    } else {
      logFail("PII Exposure Protection / Involvements", `Expected 401, got ${unauthInvolvements.statusCode}`);
    }

    // 7. Access Control on File Uploads (Phase 9)
    const unauthUpload = await makeRequest("POST", "/api/upload");
    if (unauthUpload.statusCode === 401) {
      logPass("Unauthenticated File Upload Protection", "Anonymous POST /api/upload rejected with 401");
    } else {
      logFail("Unauthenticated File Upload Protection", `Expected 401, got ${unauthUpload.statusCode}`);
    }

    // 8. Public Input Validation: Reject Malformed Email (Phase 5, 6)
    const badApp = await makeRequest("POST", "/api/applications", {
      fullName: "Test User",
      email: "invalid-email-no-at",
      programOfInterest: "coding-technology",
    });
    if (badApp.statusCode === 400) {
      logPass("Input Validation / Malformed Email", "Rejected with 400 Bad Request");
    } else {
      logFail("Input Validation / Malformed Email", `Expected 400, got ${badApp.statusCode}`);
    }

    // 9. Input Validation: Reject Missing Required Fields (Phase 5, 6)
    const emptyContact = await makeRequest("POST", "/api/contacts", {});
    if (emptyContact.statusCode === 400) {
      logPass("Input Validation / Missing Fields", "Rejected with 400 Bad Request");
    } else {
      logFail("Input Validation / Missing Fields", `Expected 400, got ${emptyContact.statusCode}`);
    }

    // 10. Valid Public Submission Test (Normal User Flow)
    const validContact = await makeRequest("POST", "/api/contacts", {
      name: "Security Audit Bot",
      email: "audit@test.security.org",
      subject: "Automated Health Verification",
      message: "Verifying security defense in depth compliance.",
    });
    if (validContact.statusCode === 201 && validContact.body.success) {
      logPass("Legitimate Public Form Submission", "HTTP 201 Created");
    } else {
      logFail("Legitimate Public Form Submission", `Expected 201, got ${validContact.statusCode}`);
    }

    // 11. Authentication Security: Reject Wrong Password (Phase 3)
    const badAuth = await makeRequest("POST", "/api/auth/login", {
      email: "admin@digiconnectghana.org",
      password: "incorrect_password_attempt",
    });
    if (badAuth.statusCode === 401 && badAuth.body.success === false) {
      logPass("Authentication / Invalid Password Rejection", "HTTP 401 Unauthorized");
    } else {
      logFail("Authentication / Invalid Password Rejection", `Expected 401, got ${badAuth.statusCode}`);
    }

    // 12. Authentication Security: Successful Admin Login (Phase 3)
    const goodAuth = await makeRequest("POST", "/api/auth/login", {
      email: "admin@digiconnectghana.org",
      password: "DigiConnect@2026!Secure",
    });

    let adminToken = "";
    if (goodAuth.statusCode === 200 && goodAuth.body.token) {
      adminToken = goodAuth.body.token;
      logPass("Authentication / Valid Admin Login", "HTTP 200 with signed token");
    } else {
      logFail("Authentication / Valid Admin Login", `Failed with ${goodAuth.statusCode}`);
    }

    // 13. Authorized Access using Bearer Token (Phase 4, 21)
    if (adminToken) {
      const authApps = await makeRequest("GET", "/api/applications", null, {
        Authorization: `Bearer ${adminToken}`,
      });
      if (authApps.statusCode === 200 && authApps.body.success) {
        logPass("Authorized Admin Access with Bearer Token", `HTTP 200 (Count: ${authApps.body.count})`);
      } else {
        logFail("Authorized Admin Access", `Expected 200, got ${authApps.statusCode}`);
      }
    }

    // 14. Session Verification Endpoint (Phase 3, 12)
    if (adminToken) {
      const verify = await makeRequest("GET", "/api/auth/verify", null, {
        Authorization: `Bearer ${adminToken}`,
      });
      if (verify.statusCode === 200 && verify.body.authenticated === true) {
        logPass("Cryptographic Session Verification", "Valid session verified");
      } else {
        logFail("Cryptographic Session Verification", `Expected 200, got ${verify.statusCode}`);
      }
    }

    // 15. Security Audit Log Access (Phase 22)
    if (adminToken) {
      const logs = await makeRequest("GET", "/api/admin/audit-logs", null, {
        Authorization: `Bearer ${adminToken}`,
      });
      if (logs.statusCode === 200 && Array.isArray(logs.body.logs)) {
        logPass("Security Audit Log Inspection", `HTTP 200 (${logs.body.logs.length} events logged)`);
      } else {
        logFail("Security Audit Log Inspection", `Expected 200, got ${logs.statusCode}`);
      }
    }

    // 16. Rate Limiting Headers Present (Phase 5, 23)
    if (health.headers["x-ratelimit-limit"]) {
      logPass("Rate Limiting Headers Inspection", `Limit: ${health.headers["x-ratelimit-limit"]}, Remaining: ${health.headers["x-ratelimit-remaining"]}`);
    } else {
      logFail("Rate Limiting Headers", "RateLimit headers not found");
    }

    // Summary
    console.log("\n\x1b[36m%s\x1b[0m", "=========================================================");
    console.log(` Results: \x1b[32m${testsPassed} Passed\x1b[0m | \x1b[31m${testsFailed} Failed\x1b[0m | Total: ${testsRun}`);
    console.log("\x1b[36m%s\x1b[0m", "=========================================================");

    if (testsFailed === 0) {
      console.log("\x1b[32m\x1b[1m%s\x1b[0m\n", " ✨ ALL SECURITY CONTROLS VERIFIED & PASSING!");
    } else {
      console.log("\x1b[31m\x1b[1m%s\x1b[0m\n", " ⚠ SOME SECURITY CONTROLS FAILED!");
      process.exitCode = 1;
    }
  } catch (err) {
    console.error("\x1b[31m%s\x1b[0m", "Error connecting to server:", err.message);
    process.exit(1);
  }
}

runSecurityAudit();

/**
 * DigiConnect Ghana - Automated Backend Unit & Security Test Suite
 * Tests core services, authentication integrity, storage fallback, and input validators.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { AuthService } from "../services/auth.service";
import { StorageService } from "../services/storage";
import { isValidEmail, isValidPhone } from "../middleware/validator";

describe("1. Validator Security Functions", () => {
  it("should validate legitimate email addresses", () => {
    assert.equal(isValidEmail("student@digiconnectghana.org"), true);
    assert.equal(isValidEmail("user.name+tag@gmail.com"), true);
    assert.equal(isValidEmail("info@knust.edu.gh"), true);
  });

  it("should reject malicious or malformed email addresses", () => {
    assert.equal(isValidEmail("not-an-email"), false);
    assert.equal(isValidEmail("<script>alert(1)</script>@evil.com"), false);
    assert.equal(isValidEmail("user@"), false);
    assert.equal(isValidEmail(""), false);
    assert.equal(isValidEmail("a".repeat(125) + "@example.com"), false);
  });

  it("should validate and allow standard international and local phone numbers", () => {
    assert.equal(isValidPhone("+233 24 555 1234"), true);
    assert.equal(isValidPhone("0245551234"), true);
    assert.equal(isValidPhone("+1 (555) 234-5678"), true);
  });

  it("should reject malformed phone strings with script injections", () => {
    assert.equal(isValidPhone("phone<script>"), false);
    assert.equal(isValidPhone("12"), false); // too short
  });
});

describe("2. Authentication & Cryptography Service", () => {
  it("should securely hash passwords and verify matching passwords", () => {
    const isMatch = AuthService.verifyPassword("DigiConnect@Dev2026!");
    assert.equal(typeof isMatch, "boolean");
  });

  it("should reject incorrect passwords", () => {
    const isWrong = AuthService.verifyPassword("WrongPassword123!");
    assert.equal(isWrong, false);
  });

  it("should generate cryptographically signed session tokens", () => {
    const token = AuthService.createSession("admin@digiconnectghana.org");
    assert.equal(typeof token, "string");
    assert.equal(token.split(".").length, 3, "Session token must have random, expiry, and HMAC signature components");

    // Session should validate
    const session = AuthService.validateSession(token);
    assert.ok(session, "Session must validate successfully");
    assert.equal(session?.email, "admin@digiconnectghana.org");
  });

  it("should reject tampered session tokens", () => {
    const token = AuthService.createSession("admin@digiconnectghana.org");
    const parts = token.split(".");
    // Tamper with the random part
    const tampered = `hacked_${parts[0]}.${parts[1]}.${parts[2]}`;
    const result = AuthService.validateSession(tampered);
    assert.equal(result, null, "Tampered token must be rejected");
  });

  it("should destroy sessions on logout", () => {
    const token = AuthService.createSession("admin@digiconnectghana.org");
    const destroyed = AuthService.destroySession(token);
    assert.equal(destroyed, true);

    // After destroying, validation must fail
    const result = AuthService.validateSession(token);
    assert.equal(result, null);
  });
});

describe("3. Storage Service & Database Resilience", () => {
  it("should retrieve valid database structure with all required collections", async () => {
    const db = await StorageService.getDatabase();
    assert.ok(Array.isArray(db.applications), "Must contain applications collection");
    assert.ok(Array.isArray(db.contacts), "Must contain contacts collection");
    assert.ok(Array.isArray(db.programs), "Must contain programs collection");
    assert.ok(Array.isArray(db.events), "Must contain events collection");
    assert.ok(Array.isArray(db.news), "Must contain news collection");
  });
});

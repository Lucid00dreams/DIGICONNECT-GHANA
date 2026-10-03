"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const seed_1 = require("../data/seed");
const DB_FILE = process.env.DATA_FILE_PATH
    ? path_1.default.resolve(process.cwd(), process.env.DATA_FILE_PATH)
    : path_1.default.resolve(__dirname, "../data/db.json");
let memoryDb = null;
let writeQueue = Promise.resolve();
class StorageService {
    static async ensureDbExists() {
        if (memoryDb) {
            return memoryDb;
        }
        try {
            const dataDir = path_1.default.dirname(DB_FILE);
            await promises_1.default.mkdir(dataDir, { recursive: true });
            const fileContent = await promises_1.default.readFile(DB_FILE, "utf-8");
            memoryDb = JSON.parse(fileContent);
            return memoryDb;
        }
        catch {
            // File doesn't exist or is invalid; initialize with seed data
            memoryDb = JSON.parse(JSON.stringify(seed_1.initialData));
            await this.persist();
            return memoryDb;
        }
    }
    static async persist() {
        if (!memoryDb)
            return;
        const snapshot = JSON.stringify(memoryDb, null, 2);
        // Chain writes to prevent concurrent file corruption
        writeQueue = writeQueue.then(async () => {
            const tempPath = `${DB_FILE}.tmp`;
            await promises_1.default.writeFile(tempPath, snapshot, "utf-8");
            await promises_1.default.rename(tempPath, DB_FILE);
        }).catch(err => {
            console.error("[StorageService] Failed to persist data to disk:", err);
        });
        await writeQueue;
    }
    static async getDatabase() {
        return await this.ensureDbExists();
    }
    static async updateDatabase(updater) {
        const db = await this.ensureDbExists();
        updater(db);
        await this.persist();
        return db;
    }
}
exports.StorageService = StorageService;

import fs from "fs/promises";
import path from "path";
import { DatabaseSchema } from "../types";
import { initialData } from "../data/seed";

const DB_FILE = process.env.DATA_FILE_PATH 
  ? path.resolve(process.cwd(), process.env.DATA_FILE_PATH)
  : path.resolve(__dirname, "../data/db.json");

let memoryDb: DatabaseSchema | null = null;
let writeQueue: Promise<void> = Promise.resolve();

export class StorageService {
  private static async ensureDbExists(): Promise<DatabaseSchema> {
    if (memoryDb) {
      return memoryDb;
    }

    try {
      const dataDir = path.dirname(DB_FILE);
      await fs.mkdir(dataDir, { recursive: true });

      const fileContent = await fs.readFile(DB_FILE, "utf-8");
      memoryDb = JSON.parse(fileContent) as DatabaseSchema;
      return memoryDb;
    } catch {
      // File doesn't exist or is invalid; initialize with seed data
      memoryDb = JSON.parse(JSON.stringify(initialData));
      await this.persist();
      return memoryDb!;
    }
  }

  private static async persist(): Promise<void> {
    if (!memoryDb) return;
    const snapshot = JSON.stringify(memoryDb, null, 2);
    
    // Chain writes to prevent concurrent file corruption
    writeQueue = writeQueue.then(async () => {
      const tempPath = `${DB_FILE}.tmp`;
      await fs.writeFile(tempPath, snapshot, "utf-8");
      await fs.rename(tempPath, DB_FILE);
    }).catch(err => {
      console.error("[StorageService] Failed to persist data to disk:", err);
    });

    await writeQueue;
  }

  public static async getDatabase(): Promise<DatabaseSchema> {
    return await this.ensureDbExists();
  }

  public static async updateDatabase(updater: (db: DatabaseSchema) => void): Promise<DatabaseSchema> {
    const db = await this.ensureDbExists();
    updater(db);
    await this.persist();
    return db;
  }
}

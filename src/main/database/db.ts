
import { initTables } from "./initialize";
const sqlite3 = require('sqlite3').verbose();
const db_path = './localdb.db';

const db = new sqlite3.Database(db_path);

initTables(db);

export default db;

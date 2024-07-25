
import { initTables } from "./initialize";
const sqlite3 = require('sqlite3').verbose();
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { env } from "process";

const platform = os.platform();
let appFolderPath;
let dbFolderName;

if (process.env.NODE_ENV == "development") {
    dbFolderName = 'TimeManagerTest';
}
else {
    dbFolderName = 'TimeManagerTest';
}

if (platform === 'win32') {
    const homeDir = os.homedir();
    appFolderPath = path.join(homeDir, 'AppData', 'Local', dbFolderName);
} else if (platform === 'linux') {
    const homeDir = os.homedir();
    appFolderPath = path.join(homeDir, '.local', 'share', dbFolderName);
} else {
    console.error('Unsupported platform:', platform);
    process.exit(1);
}

if (!fs.existsSync(appFolderPath)) {
    fs.mkdir(appFolderPath, { recursive: true }, (err) => {
        if (err) throw err;
    });
}

console.log("TEST2 ", appFolderPath);
console.log(process.env.NODE_ENV);

const db_path = path.join(appFolderPath, 'localdb.db');

const db = new sqlite3.Database(db_path);

initTables(db);

export default db;

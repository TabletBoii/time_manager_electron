
export function initTables(db: any) {
    db.exec(`
        CREATE TABLE IF NOT EXISTS "work" (
            "id"	INTEGER NOT NULL UNIQUE,
            "project_id"	INTEGER NOT NULL,
            "start_date"	INTEGER NOT NULL,
            "finish_date"	INTEGER NOT NULL,
            "name"	INTEGER NOT NULL,
            "desc"	INTEGER,
            "effective_time"	INTEGER NOT NULL DEFAULT 0,
            FOREIGN KEY("project_id") REFERENCES "projects"("id") ON DELETE CASCADE,
            PRIMARY KEY("id" AUTOINCREMENT)
        )
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS "projects" (
            "id"	INTEGER NOT NULL UNIQUE,
            "project_name"	TEXT NOT NULL,
            "project_desc"	TEXT,
            "price"	INTEGER NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT)
        )
    `);

    db.exec(`
    CREATE TABLE IF NOT EXISTS "TODO" (
        "id"	INTEGER NOT NULL UNIQUE,
        "name"	TEXT NOT NULL,
        "desc"	TEXT,
        "when"	TEXT NOT NULL,
        "status"	TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    )
    `); 
}
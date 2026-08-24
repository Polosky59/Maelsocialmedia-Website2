const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("db/ma_base.db", (err) => {
     if (err) {
          console.error(err.message)
     } else {
          console.log("Connecté à SQLite")
     }
})

const createTableSql = `
    CREATE TABLE IF NOT EXISTS meting (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TIMESTAMP NOt NULL UNIQUE,
        name TEXT,
        email TEXT,
        confirme INTEGER DEFAULT 0,
        link_confirme TEXT UNIQUE
    )
`

db.run(createTableSql)
module.exports = db

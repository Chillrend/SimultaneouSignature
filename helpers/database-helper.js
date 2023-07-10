const sqlite3 = require('sqlite3').verbose();

function getDatabase() {
    let db = new sqlite3.Database('./db/signature.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the mydb database.');
    });
    return db;
}

module.exports = {getDatabase}
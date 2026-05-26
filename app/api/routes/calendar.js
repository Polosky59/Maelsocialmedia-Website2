const express = require('express');
const router = express.Router();
const db = require('../db/db');

//todo moddifer en POST 
router.post('/add', (req, res) => {
    const date = `${req.body["date"]} - ${req.body["hour"]}`;
    console.log(date);

    const sql = `
        INSERT INTO meting (date)
        VALUES (?)
    `;

    db.run(sql, [date], function (err) {
        if (err) {
            if (err.code === "SQLITE_CONSTRAINT") {
                const sql2 = `
                    DELETE FROM meting 
                    WHERE date = ?
                `;
                db.run(sql2, [date], function (err) {
                    if (err) {
                        return res.sendStatus(500);
                    }
                    return res.sendStatus(200);
                });
            } else {
                return res.sendStatus(500);
            }
        } else {
            return res.sendStatus(200);
        }
    });
});

//todo moddifer en POST 
router.get('/lock', (req, res) => {
    const sql = `
        UPDATE meting
        SET nom = ?, email = ?, link_confirme = "1111"
        WHERE date = ?
        `
    db.run(sql, ["toto", "toto@gmail.com", "10/02/2027/14h"], function (err) {
        if (err) {
            console.log("Erreur insert :", err.message);
            return res.sendStatus(500);
        }
    })
    return res.sendStatus(200)
})

router.get('/confit/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
        UPDATE meting
        SET confirme = 1
        where  link_confirme = ? 
    `
    db.run(sql, ["1111"], function (err) {
        if (err) {
            console.log("Erreur insert :", err.message);
            return res.sendStatus(500);
        }
    })
    return res.json({ id });
});

router.get("/getAll", (req, res) => {
    const sql = `SELECT * FROM meting`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(rows);
    });
});

//todo modifier les renvois
router.get("/getAllFree", (req, res) => {
    const sql = `SELECT * FROM meting WHERE name IS NULL`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(rows);
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../db/db');
const nodemailer = require("nodemailer")
const randomUUID = require("crypto")

const verifyToken = require('../Middleware/authMiddleware');

router.post('/add',verifyToken, (req, res) => {
    const date = req.body["timestamp"]
    const uuid = crypto.randomUUID();

    const sql = `
        INSERT INTO meting (date,link_confirme)
        VALUES (?,?)
    `;

    db.run(sql, [date, uuid], function (err) {
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

router.post('/lock', (req, res) => {
    const token = crypto.randomUUID();

    const sql = `
        UPDATE meting
        SET name = ?, email = ?, link_confirme = ?
        WHERE date = ?
    `;

    db.run(sql, [req.body.username, req.body.email, token, req.body.date], function (err) {
        if (err) {
            console.log("Erreur insert :", err.message);
            return res.sendStatus(500);
        }

        return res.sendStatus(200);
    });
});

router.get('/confirme/:id', (req, res) => {
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

router.get("/getAll",verifyToken,(req, res) => {
    const sql = `SELECT * FROM meting`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(rows);
    });
});

router.get("/getAllFree", (req, res) => {
    const sql = `SELECT date FROM meting WHERE name IS NULL`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(rows);
    });
});


module.exports = router;
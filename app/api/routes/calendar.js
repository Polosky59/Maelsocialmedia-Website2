const express = require('express');
const router = express.Router();
const db = require('../db/db');
const nodemailer = require("nodemailer")
const randomUUID = require("crypto")
const path = require('path');

const verifyToken = require('../Middleware/authMiddleware');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

router.post('/add', verifyToken, (req, res) => {
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

        const subject = "Mail de vérification du rendez-vous"
        const text = `liens pour confirmer le rendez-vous http://localhost:1515/confirme/${token}`

        const from = process.env.EMAIL_NAME
        const to = req.body.email

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_NAME,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        })
        transport.sendMail({
            subject, text, from, to
        }).then(() => {
            return res.sendStatus(200);
        }).catch(err => {
            return res.sendStatus(500)
        })
    });
});

router.get("/getAll", verifyToken, (req, res) => {
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
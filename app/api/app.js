const express = require('express');
const path = require("path");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 1515;
const webPath = path.resolve(__dirname, '../web');

const RouterCalendar = require('./routes/calendar');
const Routerlogin = require('./routes/login');

const db = require('./db/db');

app.use(cookieParser());
app.use(express.static(path.join(webPath, "public")));
app.use(express.json())

const verifyToken = require('./Middleware/authMiddleware');

app.get('/', (req, res) => {
    res.sendFile(path.join(webPath, "index.html"));
});

app.get('/admin', verifyToken, (req, res) => {
    res.sendFile(path.join(webPath, "admin", "admin.html"));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(webPath, "login.html"));
})

app.get("/confirme/:id", (req, res) => {
    sql = `
    UPDATE meting
    SET confirme = 1 
    WHERE link_confirme = ?`

    db.run(sql, [req.params.id], function (err) {
        if (err) {
            console.log("Erreur insert :", err.message);
            return res.sendStatus(500);
        }
    })
    res.sendFile(path.join(webPath, "confirme.html"));
})

app.use('/api/calendar', RouterCalendar);
app.use('/api/login', Routerlogin);

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});
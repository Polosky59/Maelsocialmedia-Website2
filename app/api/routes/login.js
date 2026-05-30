const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken")
const router = express.Router();

const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const createTokenFromJson = (jsonData, options = {}) => {
    const token = jwt.sign(jsonData, process.env.JWT_SECRET, options)
    return token
}

router.post("/", function (req, res) {
    
    const username = req.body["username"]
    const password = req.body["password"]

    console.log(process.env.ADMIN_USER)

    if (username == process.env.ADMIN_USER && password == process.env.ADMIN_PASSWORD) {
        const token = createTokenFromJson(username)

        if (token) {
            res.cookie('token', token, {
                maxAge: 900000, // Expiration en millisecondes (15 min)
                httpOnly: true, // Empêche l'accès via JavaScript côté client
                //secure: true    // Nécessite HTTPS (à utiliser en production)
                sameSite: 'strict'
            });
            return res.json({ status: true, message: "Authentifié avec succès" });
        } else {
            return res.json({ status: false, error: "Impossible de générer le token" });
        }
    }
    else {
        return res.json({ status: false, error: "Connection imposible" });
    }
});
module.exports = router;
const express = require('express');
const path = require("path");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); 

const app = express();
const port = process.env.PORT || 1515;
const webPath = path.resolve(__dirname, '../web');

const RouterCalendar = require('./routes/calendar');
const Routerlogin = require('./routes/login');

app.use(cookieParser());
const verifyToken = require('./Middleware/authMiddleware'); 

app.use(express.static(path.join(webPath, "public")));


app.use(express.json()) 


//==========================================//

app.get('/', (req, res) => {
    res.sendFile(path.join(webPath, "index.html"));
});

app.get('/admin',verifyToken, (req, res) => {
    res.sendFile(path.join(webPath, "admin", "admin.html"));
});

app.get('/login',(req,res)=>{
    res.sendFile(path.join(webPath, "login.html"));
})

app.use('/api/calendar', RouterCalendar);
app.use('/api/login', Routerlogin);

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});
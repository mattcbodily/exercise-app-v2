require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      authCtrl = require('./controllers/authController'),
      battleCtrl = require('./controllers/battleController');

const app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}));

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected')
});

//auth endpoints
app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/logout', authCtrl.logout);
app.get('/api/user', authCtrl.getUser);

//battle endpoints
app.get('/api/battles/:id', battleCtrl.getUserBattles);
app.get('/api/users', battleCtrl.searchUsers);
app.post('/api/battle/:id', battleCtrl.createBattle);
app.put('/api/battle/:id', battleCtrl.acceptBattle);

const port = SERVER_PORT;
app.listen(port, () => console.log(`Exercising on ${port}`));
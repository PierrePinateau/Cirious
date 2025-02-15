/**** Import npm libs ****/
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const session = require("express-session")({

  secret: "1081a1e0c1b22b5f6a71401884e29e20228fa72021f425b7687125afs0c467d06",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,
    secure: false
  }
});
const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');



/**** Project configuration ****/

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Init of express, to point our assets
app.use(express.static(__dirname + '/front/'));

app.use(urlencodedParser);
app.use(session);

// Configure socket io with session middleware
io.use(sharedsession(session, {
  // Session automatiquement sauvegardée en cas de modification
  autoSave: true
}));

// Détection de si nous sommes en production, pour sécuriser en https
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  session.cookie.secure = true // serve secure cookies
}

/**** route ****/

app.get('/', (req, res) => { //REDIRECTION PAR DEFAUT
  res.sendFile(__dirname + '/front/html/home.html');
});


app.get('/game', (req, res) => {
  res.sendFile(__dirname + '/front/html/game.html');
});

app.get('/fauteuil', (req, res) => {
  res.sendFile(__dirname + '/front/html/fauteuil.html');
});

app.get('/parkinson', (req, res) => {
  res.sendFile(__dirname + '/front/html/parkinson.html');
});

app.get('/credit', (req, res) => {
  res.sendFile(__dirname + '/front/html/credit.html');
});


app.get('/aveugle', (req, res) => {
  res.sendFile(__dirname + '/front/html/aveugle.html');
});

app.get('/credits', (req, res) => {
  res.sendFile(__dirname + '/front/html/credit.html');
});

app.get('/phasercestdelamerde', (req, res) => {
  res.sendFile(__dirname + '/front/html/credit.html');
});

app.get('/help', (req, res) => {
  res.sendFile(__dirname + '/front/html/controle.html');
});


app.get('/myope', (req, res) => {
  res.sendFile(__dirname + '/front/html/myope.html');
});

io.on('connection', (socket) => {
  console.log('Un Utilisateur s\'est connecté\n');

    socket.on("chotto", () => {
      socket.handshake.session.terr = "Non";
    });



  /* When you have a potato connection */
  socket.on('disconnect', () => {
    console.log('Un Utilisateur s\'est déconnecté');
  });
});

http.listen(4269, () => {
  console.log('Serveur lancé sur le port 4269');
});

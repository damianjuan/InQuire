require('dotenv').config();

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
//-------------------------------------------
const passport = require("./config/passport");
const expressSession = require("express-session");
const db = require('./models');
const routes = require('./routes');

app.use(expressSession({ secret: process.env.sessionSecret, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}


// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});
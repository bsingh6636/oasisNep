const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // No array if you're using credentials
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const db = require('./models');
// In development, you might use { force: true } to drop and re-sync db
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
// });
db.sequelize.sync();


// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the service rental platform API.' });
});

// routes
require('./allRoutes')(app);


module.exports = app;

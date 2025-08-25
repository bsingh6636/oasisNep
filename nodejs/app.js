const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
// In development, you might use { force: true } to drop and re-sync db
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
// });
db.sequelize.sync();


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the service rental platform API." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/service.routes')(app);
require('./routes/order.routes')(app);
require('./routes/chat.routes')(app);


module.exports = app;

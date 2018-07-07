const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const keys = require('./configs/keys');

mongoose.connect(keys.mongoURI)
   .then(() => console.log('Connected to MongoDB'))
   .catch(error => console.log(error));

const app = express();
app.use(bodyParser.json());

// enable CORC
// https://enable-cors.org/server_expressjs.html
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

require('./routes/itemsRoute')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`App is running on port ${PORT}`));
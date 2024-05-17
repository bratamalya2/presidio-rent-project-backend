const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

const db = require('./config/data');

const auth = require('./routes/auth');
const seller = require('./routes/seller');
const buyer = require('./routes/buyer');

const port = 3005;

app.use(cors());

app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/seller', seller);
app.use('/buyer', buyer);

db();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
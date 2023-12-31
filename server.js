require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const db = require('./connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(require('./routes'));

mongoose.set('debug', true);

db.once("open", ()=>{


app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
})
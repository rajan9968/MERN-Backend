const mongoose = require('mongoose');

const dbURI = process.env.DATABASE_URL;

mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to the database');
    }).catch((err) => {
        console.log('Error connecting to the database', err);
    });

const express = require('express')
const cors = require('cors')
const postsRoutes = require('./routes/post.routes')
const uploadRoutes = require('./routes/upload.routes');
const downloadRoute = require('./routes/download.routes');
const deleteRoute = require('./routes/delete.routes');
const subscriptionRoute = require('./routes/subscription.routes');
const mongoose = require('mongoose');
require('dotenv').config();

const credentials = process.env.PATH_TO_PEM

const app = express()
const PORT = 3000;

app.use(express.json());
app.use(cors())
app.use('/posts', postsRoutes);
app.use('/upload', uploadRoutes);
app.use('/download', downloadRoute);
app.use('/delete', deleteRoute);
app.use('/subscription', subscriptionRoute);

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION, {
    dbName: process.env.DATABASE });

const db = mongoose.connection;
db.on('error', err => {
    console.log(err);
});
db.once('open', () => {
    console.log('connected to DB');
});

app.listen(PORT, (error) => {
    if(error) {
        console.log('error', error)
    } else {
        console.log(`server running on http://localhost:${PORT}`)
    }
});

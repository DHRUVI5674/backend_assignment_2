const express = require('express');
const noteRoutes = require('./routes/note.routes.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/notes', noteRoutes);

app.use((req, res) => {
    res.status(404).json({ msg: "Route not found" });
});

module.exports = app;
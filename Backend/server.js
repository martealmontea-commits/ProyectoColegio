process.on('uncaughtException', (err) => {
    console.log(' Prueba pa ver si funciona:', err);
});
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rutas = require('./route');

console.log("prueba rutica", require.resolve('./route'));
app.use('/api', rutas);

app.use(express.static(path.join(__dirname, '../Fronted/Public')));

app.get('/inscripcion', (req, res) => {
    res.sendFile(path.join(__dirname, '../Fronted/Public/views/layouts/inscripcion.html'));
});




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Fronted/Public/views/layouts/index.html'));
});

app.listen(4000, () => {
    console.log(" SERVIDOR  EN 4000");
});


const exphbs = require('express-handlebars');
process.on('uncaughtException', (err) => {
    console.log(' Prueba pa ver si funciona:', err);
});
const express = require('express');
const path = require('path');
const app = express();
app.engine(
"hbs",
exphbs.engine({
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'views/partials'),
        layoutsDir: path.join(__dirname, 'views/layouts'),
        defaultLayout: 'home'
})
);

app.set('view engine', 'hbs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rutas = require('./route');

console.log("prueba rutica", require.resolve('./route'));
app.use('/api', rutas);


app.use(express.static(path.join(__dirname, '/Public')));

app.get('/inscripcion', (req, res) => {
    res.render('inscripcion');
});

app.get('/admin', (req, res) => {
    res.render('admin');
});


app.get('/', (req, res) => {
    res.render('index');
});

console.log("SERVER NUEVO");

app.listen(4000, () => {
    console.log("Servidor corriendo en el puerto 4000");
});


const express = require('express');
const router = express.Router();
const db = require('./conexion');

console.log("ROUTE CARGADO");


// =======================
// OBTENER CITAS
// =======================
router.get('/citas', (req, res) => {

    const sql = "SELECT * FROM cita";

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err);
            return res.send(err);
        }

        res.send(results);

    });

});


// =======================
// GUARDAR CITAS
// =======================
router.post('/citas', (req, res) => {

    const nombre = req.body.nombre || "";
    const telefono = req.body.telefono || "";
    const mensaje = req.body.mensaje || "Sin mensaje";
    const email = req.body.email || "";

    const sql = `
        INSERT INTO cita (nombre, telefono, mensaje, email, estado)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [nombre, telefono, mensaje, email, 'pendiente'],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.send("ERROR MYSQL");
            }

            res.send("Cita guardada correctamente");

        }
    );

});

router.get('/hola', (req, res) => {
    res.send("HOLA");
});


// =======================
// FORMULARIO ADMIN
// =======================
router.post('/admin', (req, res) => {

    console.log("FORMULARIO ADMIN RECIBIDO");

    console.log(req.body);

    res.send("Formulario recibido correctamente");

});


module.exports = router;
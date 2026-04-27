const express = require('express');
const router = express.Router();
const db = require('./conexion');

router.post('/citas', (req, res) => {
    console.log("🔥 ENTRÓ AL POST");

    const nombre = req.body.nombre || "";
    const telefono = req.body.telefono || "";
    const mensaje = req.body.mensaje || "Sin mensaje";
    const email = req.body.email || "";

    console.log("DATOS:", nombre, telefono, mensaje, email);

    const sql = `
    INSERT INTO cita (nombre, telefono, mensaje, email, estado)
    VALUES (?, ?, ?, ?, ?)
    `;

    try {
        db.query(sql, [nombre, telefono, mensaje, email, 'pendiente'], (err, result) => {
            if (err) {
                console.log("💥 ERROR MYSQL:", err);
                return res.send("ERROR MYSQL: " + err.sqlMessage);
            }

            console.log("✅ INSERT OK");
            res.send("Cita guardada correctamente");
        });
    } catch (e) {
        console.log("💥 ERROR GENERAL:", e);
        res.send("ERROR GENERAL: " + e.message);
    }
});

module.exports = router;
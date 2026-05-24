const express = require('express');
const router = express.Router();
const db = require('./conexion');

console.log("ROUTE CARGADO");

router.post('/citas', (req, res) => {
    const { nombre, telefono, mensaje, email } = req.body;
    const sql = "INSERT INTO cita (nombre, telefono, mensaje, email, estado, id_empleado) VALUES (?, ?, ?, ?, 'pendiente', 1)";
    db.query(sql, [nombre, telefono, mensaje || 'Sin mensaje', email], (err) => {
        if (err) {
            console.log(err);
            return res.send("Error al guardar cita");
        }
        res.redirect('/inscripcion?exito=1');
    });
});

router.post('/inscripcion', (req, res) => {
    console.log("DATOS RECIBIDOS:", req.body);
    const {
        nombre_rep, apellido_rep, cedula_rep, telefono_rep, tel_laboral_rep,
        correo_rep, fecha_nac_rep, ocupacion_rep, lugar_trabajo_rep,
        nombre_nino, apellido_nino, fecha_nac_nino, sexo_nino,
        lugar_nac_nino, nacionalidad_nino, matricula,
        tipo_sangre, alergias, condiciones_medicas, medicamentos, discapacidad,
        hora_suenio, hora_despertar, toma_siesta, actividad_favorita,
        duerme_solo, duerme_con, grado, tanda, ha_asistido, motivacion,
        estado_inscripcion, id_empleado, id_departamento
    } = req.body;

    const sql = `CALL registrar_inscripcion_completa(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    db.query(sql, [
        nombre_rep, apellido_rep, cedula_rep, telefono_rep, tel_laboral_rep || '',
        correo_rep, fecha_nac_rep, ocupacion_rep || '', lugar_trabajo_rep || '', 'activo',
        nombre_nino, apellido_nino, fecha_nac_nino, sexo_nino,
        lugar_nac_nino, nacionalidad_nino, matricula,
        tipo_sangre, alergias || '', condiciones_medicas || '', medicamentos || '', discapacidad || '',
        hora_suenio, hora_despertar, toma_siesta || 0, actividad_favorita || '',
        duerme_solo || 0, duerme_con || '',
        grado, tanda, ha_asistido || 0, motivacion || '',
        estado_inscripcion || 'pendiente', id_empleado, id_departamento || 1, ''
    ], (err, results) => {
        if (err) {
            console.log("ERROR MYSQL:", err);
            return res.redirect('/moduloins?error=1');
        }
        res.redirect('/moduloins?exito=1');
    });
});

router.post('/cobro', (req, res) => {
    const { id_inscripcion, monto, metodo_pago, id_empleado } = req.body;
    const sql = 'CALL registrar_cobro(?, ?, ?, ?)';
    db.query(sql, [id_inscripcion, monto, metodo_pago, id_empleado], (err) => {
        if (err) {
            console.log(err);
            return res.redirect('/cobros?error=1');
        }
        res.redirect('/cobros?exito=1');
    });
});

router.post('/actualizar-cita', (req, res) => {
    const { id_cita, nuevo_estado, id_empleado } = req.body;
    const sql = 'CALL actualizar_estado_cita(?, ?, ?)';
    db.query(sql, [id_cita, nuevo_estado, id_empleado], (err) => {
        if (err) {
            console.log(err);
            return res.redirect('/citas?error=1');
        }
        res.redirect('/citas?exito=1');
    });
});

router.post('/empleado', (req, res) => {
    const { nombre, apellido, cedula, telefono, correo, cargo, fecha_contratacion, salario, estado } = req.body;
    const sql = "INSERT INTO empleado (nombre, apellido, cedula, telefono, correo, cargo, fecha_contratacion, salario, estado) VALUES (?,?,?,?,?,?,?,?,?)";
    db.query(sql, [nombre, apellido, cedula, telefono, correo, cargo, fecha_contratacion, salario, estado || 'activo'], (err) => {
        if (err) {
            console.log(err);
            return res.redirect('/crear?error=1');
        }
        res.redirect('/crear?exito=1');
    });
});

router.post('/usuario', (req, res) => {
    const { id_empleado, usuario, contrasena, rol, estado } = req.body;
    const sql = "INSERT INTO usuario (id_empleado, usuario, contrasena, rol, estado) VALUES (?,?,?,?,?)";
    db.query(sql, [id_empleado, usuario, contrasena, rol, estado || 'activo'], (err) => {
        if (err) {
            console.log(err);
            return res.redirect('/crear?error=1');
        }
        res.redirect('/crear?exito=1');
    });
});

module.exports = router;
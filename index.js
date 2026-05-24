const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 4000;

app.engine("hbs", exphbs.engine({
    extname: '.hbs',
    partialsDir: path.join(__dirname, '/views/partials'),
    layoutsDir: path.join(__dirname, '/views/layouts'),
    defaultLayout: 'main',
    helpers: {
        primeraletra: function(nombre) {
            if (!nombre) return '';
            return nombre.charAt(0).toUpperCase();
        },
        eq: function(a, b) {
            return a === b;
        }
    }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Public")));

app.use(session({
    secret: 'colegio_secreto_123',
    resave: false,
    saveUninitialized: false
}));

function requireLogin(req, res, next) {
    if (req.session && req.session.usuario) {
        next();
    } else {
        res.redirect('/login');
    }
}

const rutas = require('./route');
app.use('/api', rutas);

app.get('/', (req, res) => {
    res.render('index', {
        layout: "main",
        titulo: "Página principal",
        css: "Estilo.css",
        js: "script.js"
    });
});

app.get('/informacion', (req, res) => {
    res.render('informacion', {
        layout: "main",
        titulo: "Información",
        css: "Bonito.css"
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        layout: false,
        titulo: "Iniciar Sesión",
        css: "login.css"
    });
});

app.post('/login', (req, res) => {
    const { usuario, contrasena } = req.body;
    const db = require('./conexion');

    const sql = "SELECT * FROM usuario WHERE usuario = ? AND estado = 'activo'";
    db.query(sql, [usuario], (err, results) => {
        if (err || results.length === 0) {
            return res.render('login', {
                layout: false,
                titulo: "Iniciar Sesión",
                css: "login.css",
                error: "Usuario o contraseña incorrectos"
            });
        }

        const user = results[0];

        if (contrasena !== user.contrasena) {
            return res.render('login', {
                layout: false,
                titulo: "Iniciar Sesión",
                css: "login.css",
                error: "Usuario o contraseña incorrectos"
            });
        }

        req.session.usuario = {
            id: user.id_usuario,
            nombre: user.usuario,
            rol: user.rol
        };

        res.redirect('/admin');
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/admin', requireLogin, (req, res) => {
    const db = require('./conexion');
    Promise.all([
        db.promise().query('SELECT total FROM vista_total_inscripciones_mes'),
        db.promise().query('SELECT total FROM vista_total_citas_pendientes'),
        db.promise().query('SELECT total FROM vista_total_cobros_pendientes'),
        db.promise().query('SELECT total FROM vista_total_empleados_activos'),
        db.promise().query('SELECT * FROM vista_resumen_inscripciones LIMIT 5')
    ]).then(([inscripciones, citas, cobros, empleados, recientes]) => {
        res.render('admin', {
            layout: "main",
            titulo: "Dashboard",
            css: "admin.css",
            usuario: req.session.usuario,
            adminLayout: true,
            dashboardActivo: true,
            totalInscripciones: inscripciones[0][0].total,
            totalCitas: citas[0][0].total,
            totalCobros: cobros[0][0].total,
            totalEmpleados: empleados[0][0].total,
            inscripcionesRecientes: recientes[0]
        });
    }).catch(err => {
        console.log(err);
        res.render('admin', {
            layout: "main",
            titulo: "Dashboard",
            css: "admin.css",
            usuario: req.session.usuario,
            adminLayout: true,
            dashboardActivo: true
        });
    });
});

app.get('/moduloins', requireLogin, (req, res) => {
    const db = require('./conexion');
    db.promise().query('SELECT * FROM vista_resumen_inscripciones').then(([inscripciones]) => {
        res.render('moduloins', {
            layout: "main",
            titulo: "Inscripciones",
            css: "admin.css",
            usuario: req.session.usuario,
            adminLayout: true,
            inscripcionesActivo: true,
            inscripciones,
            exito: req.query.exito === '1',
            error: req.query.error === '1'
        });
    }).catch(err => {
        console.log(err);
        res.render('moduloins', {
            layout: "main",
            titulo: "Inscripciones",
            css: "admin.css",
            usuario: req.session.usuario,
            adminLayout: true,
            inscripcionesActivo: true,
            exito: req.query.exito === '1',
            error: req.query.error === '1'
        });
    });
});

app.get('/cobros', requireLogin, (req, res) => {
    const db = require('./conexion');
    db.promise().query('SELECT * FROM vista_inscripciones_sin_cobro').then(([cobros]) => {
        res.render('cobro', {
            layout: "main",
            titulo: "Cobros",
            css: "admin.css",
            usuario: req.session.usuario,
            adminLayout: true,
            cobrosActivo: true,
            cobros,
            exito: req.query.exito === '1',
            error: req.query.error === '1'
        });
    }).catch(err => {
        console.log(err);
        res.render('cobro', {
            layout: "main",
            titulo: "Cobros",
            css: "admin.css",
            usuario: req.session.usuario,
            adminLayout: true,
            cobrosActivo: true,
            exito: req.query.exito === '1',
            error: req.query.error === '1'
        });
    });
});

app.get('/citas', requireLogin, (req, res) => {
    const db = require('./conexion');
    db.promise().query('SELECT * FROM vista_citas_pendientes').then(([citas]) => {
        res.render('cita', {
            layout: "main",
            titulo: "Citas",
            css: "admin.css",
            usuario: req.session.usuario,
            adminLayout: true,
            citasActivo: true,
            citas,
            exito: req.query.exito === '1',
            error: req.query.error === '1'
        });
    }).catch(err => {
        console.log(err);
        res.render('cita', {
            layout: "main",
            titulo: "Citas",
            css: "admin.css",
            usuario: req.session.usuario,
            adminLayout: true,
            citasActivo: true,
            exito: req.query.exito === '1',
            error: req.query.error === '1'
        });
    });
});

app.get('/crear', requireLogin, (req, res) => {
    const db = require('./conexion');
    db.promise().query('SELECT id_empleado, nombre, apellido FROM empleado WHERE estado = "activo"').then(([empleados]) => {
        res.render('empleado', {
            layout: "main",
            titulo: "Empleados y usuarios",
            css: "admin.css",
            usuario: req.session.usuario,
            adminLayout: true,
            crearActivo: true,
            empleados,
            esAdmin: req.session.usuario.rol === 'administrador',
            exito: req.query.exito === '1',
            error: req.query.error === '1'
        });
    }).catch(err => {
        console.log(err);
        res.render('empleado', {
            layout: "main",
            titulo: "Empleados y usuarios",
            css: "admin.css",
            usuario: req.session.usuario,
            adminLayout: true,
            crearActivo: true,
            esAdmin: req.session.usuario.rol === 'administrador',
            exito: req.query.exito === '1',
            error: req.query.error === '1'
        });
    });
});

app.get('/inscripcion', (req, res) => {
    res.render('inscripcion', {
        layout: "main",
        titulo: "Solicitar cita",
        css: "diseno.css",
        js: "script.js"
    });
});

app.listen(PORT, () => {
    console.log(`Corriendo en http://localhost:${PORT}`);
});
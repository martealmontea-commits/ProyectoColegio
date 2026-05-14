const express = require ('express')
const path = require ('path')
const exphbs = require ('express-handlebars')
const app = express()
const PORT = process.env.PORT || 4000

app.engine(
    "hbs",
    exphbs.engine({
        extname: '.hbs',
       partialsDir: path.join(__dirname, '/views/partials'),
       layoutsDir: path.join(__dirname, '/views/layouts'),
        defaultLayout: 'main'
    })
);

app.use(express.static(path.join(__dirname, "public")))

app.get("/admin", 
    res.render("admin", {
        titulo: "panel de admin",
        css: "admin",
        js: "admin",
    })
);

app.listen(PORT, 
    console.log(`corriendo en http://localhost:${port}`)
);
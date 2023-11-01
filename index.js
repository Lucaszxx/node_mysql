const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql2");

const app = express();

//definindo handlebars como template engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// pasta de arquivos estáticos como CSS, imagens
app.use(express.static("public"));

//trabalhar com dados formato json
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());

//rotas
app.get("/", (req, res) => {
    res.render("home") 
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/register/save", (req, res) => {
    const { title, pageqty } = req.body

    const book = {
        title,
        pageqty
    }

    const query = `
        INSERT INTO books (title, pageqty)
        VALUES ('${book.title}', '${book.pageqty}')
    `

    conn.query(query, error => {
        if(error) {
            console.log(error)
            return
        }

        res.redirect("/")
    }) 
})

// Conexão com MYSQL
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3307
})

conn.connect((error) => {
    if(error) {
        console.log(error)
        return
    }

    console.log("Conectado ao MySQL!");
    
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
    })
})
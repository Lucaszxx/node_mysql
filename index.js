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
    const query = "SELECT * FROM books"
    conn.query(query, (error, data) => {
        if(error) {
            return console.log(error)
        }

        const books = data
        res.render("home",  { books }) 
    })

})

app.get("/edit/:id", (req, res) => {
    const id = req.params.id
    const sql = `
        SELECT * FROM books
        WHERE id = ${id}
    `

    conn.query(sql, (error, data) => {
        if(error) {
            return console.log(error)
        }

        const book = data[0]

        res.render('edit', {book})
    })
})

app.post("/edit/save", (req, res) => {
    const { id, title, pageqty } = req.body

    const sql = `
        UPDATE books
        SET title = '${title}', pageqty = '${pageqty}'
        WHERE id = ${id}
    `
    conn.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        res.redirect("/")
    })
})

app.get("/book/:id", (req, res) => {
    const id = req.params.id

    const sql = `
        SELECT * FROM books
        WHERE id=${id}
    `

    conn.query(sql, (error, data) => {
        if(error) {
            return console.log(error)
        }

        const book = data[0]
        
        res.render("book", { book })
    })
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
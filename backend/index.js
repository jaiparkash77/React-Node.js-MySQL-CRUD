import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

// mysql connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "reactcurd",
})

// if Authentication problem use below code
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';

//send json data to express -> to prevent error of sending json data to express
app.use(express.json())

app.use(cors())

// react request to backend server
app.get("/", (req, res)=>{
    res.json("Hello this is the backend")
})

// get all books from db
app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"

    //execute query -> this will return error or data
    db.query(q, (err,data)=>{
        if(err) return res.json(err)

        return res.json(data)
    })
})

// add book to db
app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"
    const values = [req.body.title, req.body.desc, req.body.price, req.body.cover]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)

        return res.json("Book has been created!")
    })
})


// delete from db
app.delete("/books/:id", (req, res)=>{
    const bookId = req.params.id;

    const q= "DELETE FROM books WHERE id=?"

    db.query(q,[bookId], (err,data)=>{
        if(err) return res.json(err)

        return res.json("Book has been deleted!")
    })
})

// update from db
app.put("/books/:id", (req, res)=>{
    const bookId = req.params.id;

    const q= "UPDATE books SET `title`=?, `desc`=?, `price`=?, `cover`=? WHERE id=?"
    const values = [req.body.title, req.body.desc, req.body.price, req.body.cover]

    db.query(q,[...values,bookId], (err,data)=>{
        if(err) return res.json(err)

        return res.json("Book has been updated!")
    })
})


// backend connection port - http://localhost:8800/
app.listen(8800, ()=>{
    console.log("Connected to backend! with node Js");
})
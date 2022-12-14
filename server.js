const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database:  'users'
});

app.post('/create', (req, res) => {
    const location = req.body.location;
    const alias = req.body.alias;
    const email = req.body.email;

    db.query("INSERT INTO employees (location, alias, email) VALUES (?,?,?)", [location, alias, email], 
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Values Inserted")
        } 
    }
    );
});

app.get('/users', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {    
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/update', (req, res) => {
    const id = req.body.id 
    db.query(
        "UPDATE users SET location = ? WHERE id = ?", [location, id], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query(
        "DELETE FROM users WHERE id = ?", 
        id, 
        (err, result) => {
            if (err) {
            console.log(err);
            } else {
            res.send(result);
            }
    })
});


app.listen(5432, ()=> {
    // console.log("yeeeessss");
});
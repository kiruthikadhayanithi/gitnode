const express = require('express');
var bodyParser = require('body-parser');
const conn = require('./service/user');

const app = express();
app.use(bodyParser.json());

app.get('/getting', (req, res) => {
    conn.query('select * from users', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/getting/:id', (req, res) => {
    conn.query(`select * from users where id =${req.params.id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/updateing/:id', (req, res) => {
    var sql = `update users set books = '${req.body.books}' where id = ${req.params.id}`;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("updated");
        }
    });
});

app.delete('/error/:id', (req, res) => {
    var sql = `delete from users where id =${req.params.id}`;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Deleted");
        }
    });
});

app.post('/data', (req, res) => {
    var id = req.body.id;
    var books = req.body.books;
    conn.query(`insert into users (id,books) values (?,?) `, [id, books], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Inserted");
        }
    });
});



app.listen(8000);

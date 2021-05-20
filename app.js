const { response } = require('express');
const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express()
app.use(express.static(path.resolve(__dirname, 'client')))
app.use(express.json())

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'technomart'
})

conn.connect(err => {
    if(err) {
        console.log('Подключение к базе данных не установлено', err)
    } else {
        console.log('Подключение к базе данных установленно успешно!')
    }
})

// Admin 
app.use('/admin', express.static(path.resolve(__dirname, 'client/pages/admin')))
app.get('/admin', (req, resp) => {
    resp.sendFile(path.resolve(__dirname, 'client', 'pages/admin', 'auth.html'))
})

app.post('/api/admin', (req, resp) => {
    const {login, password} = req.body

    conn.query(`SELECT * FROM users WHERE login = '${login}' AND password = '${password}' AND isAdmin = 1`, function(err, result) {
        if(result.length > 0) {
            resp.sendFile(path.resolve(__dirname, 'client', 'pages/admin', 'panel.html'));
        } else {
            resp.json({message: 'bad data'})
        }

        if(err) {
            console.log(err)
        }
        console.log(result);
    })
})


// Catalog
app.get('/perforators', (req, resp) => resp.json({send: 'Перфораторы'}))


// Default
app.get('*', (req, resp) => resp.sendFile(path.resolve(__dirname, 'client', 'index.html')))
app.listen(7000, () => console.log('Server is started on port 7000'))
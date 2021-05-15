const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express()
app.use(express.static(path.resolve(__dirname, 'client')))

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

// GET 
app.use('/admin', express.static(path.resolve(__dirname, 'client/pages/admin')))
app.get('/admin', (req, resp) => {
    resp.sendFile(path.resolve(__dirname, 'client', 'pages/admin', 'auth.html'))
})

app.get('/perforators', (req, resp) => resp.json({send: 'Перфораторы'}))

// POST


app.get('*', (req, resp) => resp.sendFile(path.resolve(__dirname, 'client', 'index.html')))
app.listen(7000, () => console.log('Server is started on port 7000'))
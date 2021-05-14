const express = require('express');
const path = require('path');

const app = express()

app.use(express.static(path.resolve(__dirname, 'client')))

// GET 
app.get('/admin', (req, resp) => resp.json({admin: true}))

// POST

app.get('*', (req, resp) => resp.sendFile(path.resolve(__dirname, 'client', 'index.html')))
app.listen(7000, () => console.log('Server is started on port 7000'))
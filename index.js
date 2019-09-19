const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = new express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('Hello!');
})

app.post('/api/blog', (req, res, next) => {
    console.log(req.body);

    const data = `
    ---
    title: ${req.body.title}
    author: ${req.body.author}
    date: ${new Date()}
    ---
    ${req.body.body}
    `

    fs.writeFile(`./markdown/${req.body.title.replace(/\s+/g, '')}`, data, (err) => {
        if(!err) {
            res.status(202);
            res.send('Post accepted.');
        }
        else {
            res.status(500);
            res.send('Server error, please try again.');
        }
    })
})

app.listen(3000, () => {
    console.log('listening on 3000!');
})
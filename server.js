const express = require('express')
const app = express()
const port = 3001
const fs = require('fs')
const path = require('path')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/newuser', (req, res) => {
    fs.readFile("./users.json", function (err, data) {
        if (err) throw err;
        let connectedUser = JSON.parse(data);
        console.log(connectedUser);
        if (!connectedUser[req.body.address]) {
            console.log("hello");
            connectedUser[`${req.body.address
                }`] = req.body.address
            fs.writeFile("users.json", JSON.stringify(connectedUser), err => {
                if (err) throw err;
                console.log("Done writing");
            });
        }
        res.send(connectedUser)
    });
})

app.get('/allusers', (req, res) => {
    fs.readFile("./users.json", function (err, data) {
        if (err) throw err;
        let connectedUser = JSON.parse(data);
        console.log(connectedUser);
        res.send(connectedUser)
    });
})

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port || process.env.PORT, () => {
    console.log(`Example app listening on port ${port}`)
})
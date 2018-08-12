//Install express server
const express = require('express');
const path = require('path');

var bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, token_type, access_token, refresh_token, expiry_date');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Flatfile Database: 
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ users: [], count: 0 }).write()


/**** BACKEND SERVER ****/
app.get('/server/users', function(req, res) {
    res.send({ status: 1, result: db.get('users').value() });
});
app.post('/server/users', function(req, res) {
    db.get('users').push(req.body).write();
    res.send({ status: 1 });
});

/**** FRONTEND ANGULAR APP ****/
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/ng-bootstrap-starter'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/ng-bootstrap-starter/index.html'));
});

// Start the app by listening on the default Heroku port
var port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));



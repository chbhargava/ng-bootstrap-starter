//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/ng-bootstrap-starter'));

// For backend:
app.get('/server/test', function(req,res) {
    res.send({ express: 'success' });
});

// For Angular APP:
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/ng-bootstrap-starter/index.html'));
});

// Start the app by listening on the default Heroku port
var port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));



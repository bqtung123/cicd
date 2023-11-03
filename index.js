let express = require('express');
let path = require('path');
let fs = require('fs');
const mongoose = require('mongoose');
const User = require('./User.js');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

// use when starting application locally
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// use when starting application as docker container
let mongoUrlDocker = "mongodb://admin:password@mongodb/admin";

app.post('/update-profile', async function (req, res) {
  let userObj = req.body;

  var conditions = {}

  await User.findOneAndUpdate(conditions, userObj);

  // Send response
  res.send(userObj);
});

async function connect(){
 try {
    await mongoose.connect(mongoUrlDocker);
    console.log("connect succesfully");
 } catch (error) {
    console.log(error);
 }
} 
connect()

app.get('/get-profile', async function (req, res) {
  let users = await User.findOne({});
  res.json(users)
});

app.listen(5000, function () {
  console.log("app listening on port 5000!");
});

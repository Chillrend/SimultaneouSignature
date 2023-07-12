var express = require('express');
var router = express.Router();
const DatabaseHelper = require('../helpers/database-helper')

/* GET home page. */
router.get('/', function(req, res, next) {
  const db = DatabaseHelper.getDatabase();

  const query = db.all('SELECT _id, fullname, signature, organization, position FROM signature', (err, rows) => {
    res.render('index', { title: process.env.EVENT_NAME, scripts: [{script: "/javascripts/jsketch.min.js"}, {script: "/javascripts/index.js"}] , signatures: rows });
  });
});

router.get('/signs', function(req, res, next) {
  const db = DatabaseHelper.getDatabase();

  const query = db.all('SELECT _id, fullname FROM signature', (err, rows) => {
    console.log(rows)
    res.render('add_signs', { title: process.env.EVENT_NAME, scripts: [{script: "/javascripts/jsketch.min.js"},{script: "/javascripts/add_signs.js"}], names: rows });
  });
});

router.post('/signs', function(req, res, next) {
  const id = req.body.id;
  const signature = req.body.signature;

  const db = DatabaseHelper.getDatabase();

  const statement = db.prepare('UPDATE signature SET signature=? WHERE _id=?');
  statement.run(signature,id);

  res.redirect('/');
});

router.get('/signs/all', function (req, res, next) {
  const id = req.params.id;

  const db = DatabaseHelper.getDatabase();
  const query = db.all(`SELECT _id, fullname FROM signature`, (err, rows) => {
    res.json(rows);
  });

});
router.get('/signs/:id', function (req, res, next) {
  const id = req.params.id;

  const db = DatabaseHelper.getDatabase();
  const query = db.get(`SELECT signature FROM signature WHERE _id=${id}`, (err, row) => {
    res.send(row);
  });

});



module.exports = router;

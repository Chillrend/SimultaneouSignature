var express = require('express');
var router = express.Router();
const DatabaseHelper = require('../helpers/database-helper')

router.get('/', function (req, res, next) {
    res.render('admins', {title: process.env.EVENT_NAME, message: req.flash('message')});
});

router.get('/reset_signature', function (req, res, next) {
   const db = DatabaseHelper.getDatabase();
   const truncate_signature = db.run(`UPDATE signature SET signature =''`, function (err) {
       res.redirect('/admins');
   })
});

router.get('/edit', function (req, res, next) {
    const db = DatabaseHelper.getDatabase();

    const guests = db.all('SELECT * FROM signature', function (err, rows) {
        res.render('guests', {title: process.env.EVENT_NAME, guests: rows, message: req.flash('message'), error: req.flash('error')})
    });
});

router.post('/edit/:id', function (req, res, next) {
    const db = DatabaseHelper.getDatabase();

    const id = req.params.id;
    const name = req.body.name;
    const signature = req.body.signature;
    const position = req.body.position;
    const organization = req.body.organization;

    const statement = db.prepare('UPDATE signature SET fullname=?, signature=?, position=?, organization=? WHERE _id=?');
    statement.run(name, signature, position, organization, id);
    req.flash('message', `Successfully edited ${name}`)

    res.redirect('/admins/edit');
});
router.get('/edit/:id', function (req, res, next) {
    const db = DatabaseHelper.getDatabase();
    const id = req.params.id;

    const show_all = db.get(`SELECT * FROM signature WHERE _id=${id}`, function (err, row) {
        console.log(row)
        res.render('guests-edit', {title: process.env.EVENT_NAME, guest: row});
    })
});

router.get('/delete/:id', function (req, res, next){
    const db = DatabaseHelper.getDatabase();
    const id = req.params.id;

    db.run(`DELETE FROM signature WHERE _id=${id}`, (err) => {
        if(err){
            req.flash('error', 'Error deleting guests:' + err.toString())
        }else{
            req.flash('message', 'Succesfully deleted guest')
        }
        res.redirect('back');
    })
});


router.get('/truncate', function (req, res, next) {
    const db = DatabaseHelper.getDatabase();
    const truncate_sequence = db.run('DELETE FROM sqlite_sequence WHERE name="signature"');
    const truncate_all_db = db.run(`DELETE FROM signature`, function (err) {
        if(err){
            req.flash('error', `Error truncating all guests list: ${err.toString()}`);
        }else{
            req.flash('message', 'Successfully truncated all guest lists');
        }
        res.redirect('/admins');
    });

});

router.post('/insert_guests', function (req, res, next) {
    const db = DatabaseHelper.getDatabase();

    const fullname = req.body.name;
    const position = req.body.position;
    const organization = req.body.organization;

    const statement = db.prepare('INSERT INTO signature(fullname, position, organization) VALUES (?,?,?)');
    statement.run(fullname, position, organization);

    req.flash('message', `Successfully inserted ${fullname}`)
    res.redirect('back');
})

module.exports = router;
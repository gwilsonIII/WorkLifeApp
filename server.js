var express = require('express');		//Creates an express object
var mysql = require('./connect.js');	//Creates connect object (to connect Node to SQL)
var app = express();					//Calls the express constructor
var request = require('request');

app.set('port', 17941);					//Listens to any traffic at port 17941


//GET request MySQL table employees
app.get('/getTable', function(req, res, next) {

		mysql.pool.query('SELECT * FROM employees', function(err, rows, fields) {
			if(err) {
				next(err);
				return;
			}
		
			var results = JSON.stringify(rows);
			res.header('Access-Control-Allow-Origin', '*');
			res.send(results);
		});
});


//GET request MySQL table workContacts
app.get('/getWorkContacts', function(req, res, next) {

		mysql.pool.query('SELECT * FROM workContacts', function(err, rows, fields) {
			if(err) {
				next(err);
				return;
			}
		
			var results = JSON.stringify(rows);
			res.header('Access-Control-Allow-Origin', '*');
			res.send(results);
		});
});

//Add contact info from  addcontacts form to the employee info database
app.get('/addcontacts.html',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO workContacts (coID, fname, lname, email, phone) VALUES (?, ?, ?, ?, ?)", [req.query.coID, req.query.fname, req.query.lname, req.query.email, req.query.phone], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});

//Error handling: 404
app.use(function(req, res) {
	res.status(404);
	res.header('Access-Control-Allow-Origin', '*');
	res.send('404');
		
});


//Error handling: 500
app.use(function(req, res) {
	console.error(err.stack);
	res.status(500);
	res.header('Access-Control-Allow-Origin', '*');
	res.send('500');
});


//Outputs to console how to terminate session.
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
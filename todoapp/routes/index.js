const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'todo_app'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query(
    `select * from tasks;`,
    (error, results) => {
      console.log(error);
      console.log(results);
      res.render('index', {
        title: 'ToDo App',
        todos: results,
      });
    }
  );
});

router.post('/', function(req, res, next) {
  connection.connect((err) => {
    if(err) {
      console.log('error connecting: ' + err.stack);
      return
    }
    console.log('success');
  });

  const todo = req.body.add;
  
  connection.query(
    `insert into tasks (user_id, content, done) values (1, '${todo}', 0);`,
    (error, results) => {
      //SQL実行後に行う処理
      console.log(error);
      res.redirect('/');
    }
  );

});

router.post('/change', function (req, res) {
  connection.connect((err) => {
    if(err) {
      console.log('error connecting: ' + err.stack);
      return
    }
    console.log('success');
  });

  const id = req.body.change;

  connection.query(
    'UPDATE tasks SET done= not done WHERE id=?', id,
    (error, results) => {
      //SQL実行後に行う処理
      console.log(error);
      res.redirect('/');
    }
  );
});

router.post('/delete', function (req, res) {
  connection.connect((err) => {
    if(err) {
      console.log('error connecting: ' + err.stack);
      return
    }
    console.log('success');
  });

  const id = req.body.del;

  connection.query(
    'DELETE FROM tasks WHERE id=?', id,
    (error, results) => {
      //SQL実行後に行う処理
      console.log(error);
      res.redirect('/');
    }
  );
});






module.exports = router;
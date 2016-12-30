var pg = require('pg');
var fs = require('fs');
var config = {
  user: 'postgres',
  password: 'khoapham',
  host: 'localhost',
  port: 5432,
  database: 'EmployeeDB',
  idleTimeoutMillis: 3000,
  max: 100
}
var pool = new pg.Pool(config);

function remove(dir){
  return new Promise(function(resolve, reject) {
    fs.unlink(dir,err => {
      if(err) reject(err);
      resolve(dir);
    })
  })
}

function queryDB(sql){
  return new Promise(function(resolve, reject) {
    pool.connect((err, client, done) => {
      if(err) return reject(err);
      done();
      client.query(sql, (err, result) => {
        if(err) return reject(err);
        return resolve(result.rows);
      });
    });
  });
}

queryDB('SELECT * FROM "User" WHERE id = 6')
.then(function(rows){
  return remove('./'+rows[0].image);
})
.then(function(dir){
  console.log('Xoa thanh cong file ' + dir);
})
.catch(function(err){
  console.log(err + '');
})

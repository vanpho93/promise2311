//Promise
var fs = require('fs');

function remove(dir){
  return new Promise(function(resolve, reject) {
    fs.unlink(dir,err => {
      if(err) reject(err);
      resolve(dir);
    })
  })
}

remove('./1.png')
.then(function(a){
  console.log('Xoa thanh cong file: ' + a);
})
.catch(function(err){
  console.log('Xoa that bai ' + err);
});

// pr.then(function(){
//   console.log('Thanh cong');
// }).catch(function(){
//   console.log('That bai');
// })

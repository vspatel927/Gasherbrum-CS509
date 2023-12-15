const mysql = require('mysql');
const db_access = require('db_access');

exports.handler = async (event) => {
  var pool = mysql.createConnection({
  // credentials from db_access layer (loaded separately via console)
  multipleStatements: true,
  host: db_access.config.host,
  user: db_access.config.user,
  password: db_access.config.password,
  database: db_access.config.database
  });
  
  
let purchaseComputer = (id, store, price) => {
    
    var storeCut = price * 0.95
    var siteCut = price * 0.05
    
return new Promise((resolve, reject) => {
    
  pool.query(`DELETE FROM Computers WHERE computer_id=?`, [id], (error, rows, fields) => {
    if (error) { return reject(error); }
    if(rows.affectedRows === 0){ 
        return reject(error);
    }
    else{
        pool.query(`UPDATE Stores SET acct_balance = acct_balance + ${storeCut} WHERE name=?; UPDATE Site SET acct_balance = acct_balance + ${siteCut} WHERE username = 'master'`, [store], (error, rows, fields) => {
    if (error) { return reject(error); }
    else{
        return resolve("Computer purchased")
    }
});
    }
});

});
}

try{
    var r = '';
    const result = await purchaseComputer(event.id, event.store, event.price).then(function (response) {
    r = response;
    });
        
        const response = {
        statusCode: 200,
        body: JSON.stringify(r)
        };
return response;
}

catch(error){
      console.error(error);
    const response = {
      statusCode: 500,
      body: 'Computer Already Purchased'
    };
    return response;
}
finally{
    pool.end();
}
};

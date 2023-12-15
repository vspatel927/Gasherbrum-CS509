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
  
  
let removeComputer = (id, store) => {
return new Promise((resolve, reject) => {
pool.query("DELETE FROM Computers WHERE computer_id=?; UPDATE Stores SET acct_balance = acct_balance - 25 WHERE name=?; UPDATE Site SET acct_balance = acct_balance + 25 WHERE username = 'master'", [id, store], (error, rows, fields) => {
    if (error) { return reject(error); }
    if ((rows)) {
    return resolve(rows[0]);
    } else {
    return reject("unable to remove computer");
    }

});
});
}

try{
    var r = '';
    const result = await removeComputer(event.id, event.store).then(function (response) {
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
      body: 'Internal Server Error'
    };
    return response;
}
finally{
    pool.end();
}
};

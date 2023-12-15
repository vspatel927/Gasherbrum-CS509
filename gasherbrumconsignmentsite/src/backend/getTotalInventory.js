const mysql = require('mysql');
const db_access = require('db_access');

exports.handler = async (event) => {
  var pool = mysql.createConnection({// credentials from db_access layer (loaded separately via console)
  host: db_access.config.host,
  user: db_access.config.user,
  password: db_access.config.password,
  database: db_access.config.database
  });
  
  
let getTotalInventory = () => {
return new Promise((resolve, reject) => {
pool.query("SELECT sum(price) AS inventorySum FROM Computers", (error, rows, fields) => {
    if (error) { return reject(error); }
    if (rows) {
    return resolve(rows[0]);
    } else {
    return reject("error: unable to obtain report");
    }
});
});
}
try{
    var r = '';
    const result = await getTotalInventory().then(function (response) {
    r = response;
    });
        
        const response = {
        statusCode: 200,
        body: r
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

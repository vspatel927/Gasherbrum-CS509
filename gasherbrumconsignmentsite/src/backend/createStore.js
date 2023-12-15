const mysql = require('mysql');
const db_access = require('db_access');

exports.handler = async (event) => {
  var pool = mysql.createConnection({// credentials from db_access layer (loaded separately via console)
  host: db_access.config.host,
  user: db_access.config.user,
  password: db_access.config.password,
  database: db_access.config.database
  });
  
  
let insertStoreintoDB = (name, password, latitude, longitude) => {
return new Promise((resolve, reject) => {
pool.query("INSERT INTO Stores (name, password, latitude, longitude, acct_balance) VALUES (?, ?, ?, ?, ?);", [name, password, latitude, longitude, 0], (error, rows, fields) => {
if (error) { return reject(error); }
else{
  return resolve(JSON.stringify(rows));
}
});
});
}

try{
  const result = await insertStoreintoDB(event.name, event.password, event.latitude, event.longitude)
    const response = {
    statusCode: 200,
    body: JSON.stringify(result)
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

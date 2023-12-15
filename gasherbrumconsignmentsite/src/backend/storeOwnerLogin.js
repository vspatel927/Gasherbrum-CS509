const mysql = require('mysql');
const db_access = require('db_access');

exports.handler = async (event) => {
  var pool = mysql.createConnection({// credentials from db_access layer (loaded separately via console)
  host: db_access.config.host,
  user: db_access.config.user,
  password: db_access.config.password,
  database: db_access.config.database
  });
  
  
let checkPassword = (name, password) => {
return new Promise((resolve, reject) => {
pool.query("SELECT password FROM Stores WHERE name=?", [name], (error, rows, fields) => {
    if (error) { return reject(error); }
    if ((rows) && (rows.length == 1) && (rows[0].password === password)) {
    return resolve(rows[0].password);
    } else {
    return reject("incorrect password for store '" + name + "'");
    }
});
});
}

try{
    var r = '';
    const result = await checkPassword(event.name, event.password).then(function (response) {
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

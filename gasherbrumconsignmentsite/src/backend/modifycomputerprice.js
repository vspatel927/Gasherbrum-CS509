const mysql = require('mysql');
const db_access = require('db_access');

exports.handler = async (event) => {
  var pool = mysql.createConnection({// credentials from db_access layer (loaded separately via console)
  host: db_access.config.host,
  user: db_access.config.user,
  password: db_access.config.password,
  database: db_access.config.database
  });
  
  
let modifycomputerprice = (id, price) => {
return new Promise((resolve, reject) => {
pool.query("UPDATE Computers SET price =? WHERE computer_id=?", [price, id],(error, rows, fields) => {
    if (error) { return reject(error); }
    if ((rows)) {
    return resolve(rows[0]);
    
    } else {
    return reject("Unable to modify price" );
    }
});
});
}

try{
    var r = '';
    const result = await modifycomputerprice(event.id, event.price).then(function (response) {
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

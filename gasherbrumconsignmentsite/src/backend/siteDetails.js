const mysql = require('mysql');
const db_access = require('db_access');

exports.handler = async (event) => {
  var pool = mysql.createConnection({// credentials from db_access layer (loaded separately via console)
  host: db_access.config.host,
  user: db_access.config.user,
  password: db_access.config.password,
  database: db_access.config.database
  });
  
  
let getInfo = (sort) => {

var query = '';

if(sort === 'ASC'){
    query = `SELECT name, COALESCE(acct_balance, 0) AS storeBal, COALESCE(SUM(price), 0) AS inventory FROM Gasherbrum.Stores s LEFT JOIN Gasherbrum.Computers c on c.store_name = s.name GROUP BY name ORDER BY inventory ASC`
}
else{
    query = `SELECT name, COALESCE(acct_balance, 0) AS storeBal, COALESCE(SUM(price), 0) AS inventory FROM Gasherbrum.Stores s LEFT JOIN Gasherbrum.Computers c on c.store_name = s.name GROUP BY name ORDER BY inventory DESC`

}
return new Promise((resolve, reject) => {
pool.query(query, (error, rows, fields) => {
    if (error) { return reject(error); }
    if ((rows)) {
    return resolve(rows);
    } else {
    return reject("error");
    }
});
});
}

try{
    var r = '';
    const result = await getInfo(event.sort).then(function (response) {
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

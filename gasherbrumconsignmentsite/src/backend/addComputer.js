const mysql = require('mysql');
const db_access = require('db_access');

exports.handler = async (event) => {
  var pool = mysql.createConnection({// credentials from db_access layer (loaded separately via console)
  host: db_access.config.host,
  user: db_access.config.user,
  password: db_access.config.password,
  database: db_access.config.database
  });
  
  
let addComputer = (price, memory, storage, processor, generation, graphics, name) => {
return new Promise((resolve, reject) => {
pool.query("INSERT INTO Computers (price, memory, storage, processor, processor_gen, graphics, store_name) VALUES (?, ?, ?, ?, ?, ?, ?);", [price, memory, storage, processor, generation, graphics, name], (error, rows, fields) => {
if (error) { return reject(error); }
else{
  return resolve(JSON.stringify(rows));
}
});
});
}
try{
  var r = '';
  const result = await addComputer(event.price, event.memory, event.storage, event.processor, event.generation, event.graphics, event.name).then(function (response) {
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

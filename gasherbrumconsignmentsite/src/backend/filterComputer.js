const mysql = require('mysql');
const db_access = require('db_access');

exports.handler = async (event) => {
  var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
  host: db_access.config.host,
  user: db_access.config.user,
  password: db_access.config.password,
  database: db_access.config.database
  });
  
var storeLat = 'latitude'
var storeLong = 'longitude'
  
let filterComputer = (price, memory, storageSize, processor, processorGen, graphics, store, cLatitude, cLongitude) => {
    
    var whereClauses = [];
  if (price.length > 0) {
    whereClauses.push(priceFilter(price));
  }
  if (memory.length > 0){
    whereClauses.push(memoryFilter(memory));
  }
  if (storageSize.length > 0) {
    whereClauses.push(storageSizeFilter(storageSize));
  }
  if(processor.length > 0){
      whereClauses.push(processorFilter(processor));
  }
  if(processorGen.length > 0){
      whereClauses.push(processorGenFilter(processorGen));
  }
  if(graphics.length > 0){
      whereClauses.push(graphicsFilter(graphics));
  }
  if(store.length > 0 && !(store.includes('*'))){
    whereClauses.push(storeFilter(store));
  }
  
  var query = ''
  
  if(whereClauses.length > 0){
    whereClauses.join(' AND ')
    query = `SELECT *, price+0.03*(60*ABS(${cLatitude}-latitude) + 60*ABS(${cLongitude}-longitude)) AS totalPrice FROM Computers c JOIN Stores s on c.store_name = s.name WHERE ` + whereClauses.join(' AND ')
  }
  else{
    query = `SELECT * FROM Computers c JOIN Stores s on c.store_name = s.name`
  }

return new Promise((resolve, reject) => {
pool.query(query, (error, rows, fields) => {
    if (error) { return reject(error); }
    if ((rows)) {
    const addedField = rows.map(result => ({
        ...result,
        shipping: shippingPrice(cLatitude, cLongitude, result.latitude, result.longitude, "N"),
        totalPrice: (parseFloat(shippingPrice(cLatitude, cLongitude, result.latitude, result.longitude, "N")) + parseFloat(result.price)),
    }));
    return resolve(addedField);
    } else {
    return reject("Error: Filter error");
    }
});
});
}

function shippingPrice(cLatitude, cLongitude, latitude, longitude, unit) {
	if ((cLatitude == latitude) && (cLongitude == longitude)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * cLatitude/180;
		var radlat2 = Math.PI * latitude/180;
		var theta = cLongitude-longitude;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return (0.03*dist).toFixed(2);
	}
}

function priceFilter(priceFilter) {
  
  var conditions = [];
  priceFilter.map((filter) => {
    
      if(filter === '2001+'){
        conditions.push('price >= 2001');
      }
      if(filter === '1501to2000'){
        conditions.push('price BETWEEN 1501 AND 2000');
      }
      if(filter === '1001to1500'){
        conditions.push('price BETWEEN 1001 AND 1500');
      }
      if(filter === '501to1000'){
         conditions.push('price BETWEEN 501 AND 1000');
      }
      if(filter === '500-'){
        conditions.push('price <= 500');
      }
  });

    return "(" + conditions.join(' OR ') + ")";
}

function memoryFilter(memoryFilter){
    var conditions = [];
  memoryFilter.map((filter) => {
    
      if(filter === '32GB+'){
        conditions.push('memory = "32 GB"');
      }
      if(filter === '16GB'){
        conditions.push('memory = "16 GB"');
      }
      if(filter === '8GB'){
        conditions.push('memory = "8 GB"');
      }
      if(filter === '4GB-'){
         conditions.push('memory = "4 GB" OR memory = "1 GB"');
      }
  });

  return "(" + conditions.join(' OR ') + ")";
}

function storageSizeFilter(storageSizeFilters) {
    var conditions = [];

  storageSizeFilters.map((filter) => {
      if(filter === '2TB+'){
        conditions.push('storage = "4 TB" OR storage = "2 TB"'); 
      }
      if(filter === '1TB'){
        conditions.push('storage = "1 TB"');
      }
      if(filter === '512GB'){
         conditions.push('storage = "512 GB"');
      }
      if(filter === '256GB-'){
        conditions.push('storage = "256 GB" OR storage = "128 GB"');
      }
  });

    return "(" + conditions.join(' OR ') + ")";
}

function processorFilter(processorFilter){
    var conditions = [];
  processorFilter.map((filter) => {
      if(filter === 'All_Intel_Processors'){
        conditions.push('processor LIKE "%Intel%"');
      }
      if(filter === 'All_AMD_Processors'){
        conditions.push('processor LIKE "%AMD%"');
      }
  });

    return "(" + conditions.join(' OR ') + ")";
}

function processorGenFilter(processorGenFilter){
    var conditions = [];
  processorGenFilter.map((filter) => {
      if(filter === '13th_Gen_Intel'){
        conditions.push('processor_gen = "13th Gen Intel"'); 
      }
      if(filter === '12th_Gen_Intel'){
        conditions.push('processor_gen = "12th Gen Intel"');
      }
      if(filter === '11th_Gen_Intel'){
        conditions.push('processor_gen = "11th Gen Intel"');
      }
      if(filter === 'AMD_Ryzen_7000_Series'){
        conditions.push('processor_gen = "AMD Ryzen 7000 Series"');
      }
      if(filter === 'AMD_Ryzen_6000_Series'){
        conditions.push('processor_gen = "AMD Ryzen 6000 Series"');
      }
  });

    return "(" + conditions.join(' OR ') + ")";
}

function graphicsFilter(graphicsFilter){
    var conditions = [];
  graphicsFilter.map((filter) => {
      if(filter === 'All_NVIDIA_Graphics'){
        conditions.push('graphics LIKE "%NVIDIA%"');
      }
      if(filter === 'All_Intel_Graphics'){
        conditions.push('graphics LIKE "%Intel%"');
      }
      if(filter === 'All_AMD_Graphics'){
        conditions.push('graphics LIKE "%AMD%"');
      }
  });

    return "(" + conditions.join(' OR ') + ")";
}

function storeFilter(storeFilter){
  var conditions = [];
  storeFilter.map((filter) => {
    conditions.push(`store_name = '${filter}'`);
  });
    return "(" + conditions.join(' OR ') + ")";
}

try{
  var r = '';
  const result = await filterComputer(event.price, event.memory, event.storageSize, event.processor, event.processorGen, event.graphics, event.store, event.latitude, event.longitude).then(function (response) {
    r = response;
  });
  
  const response = {
  statusCode: 200,
  body: r
  };
return response;
  }
  
catch (error) {
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

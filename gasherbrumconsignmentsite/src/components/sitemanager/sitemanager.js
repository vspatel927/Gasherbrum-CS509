import axios from 'axios';
import { useState, useEffect } from 'react';


function SiteManager(){
    const [listOfStores, setlistOfStores] = useState([]);

    useEffect(() => {
      axios
        .get('https://f96at78893.execute-api.us-east-2.amazonaws.com/getStores/getStores')
        .then((response) => setlistOfStores(response.data.body))
        .catch(error => {
         console.log(error);
    });
    }, [])
  return (
    <>
          {listOfStores.map((store) => (
        <div key={store.name}>
         <h2>{store.name}</h2>
         <button name = "Delete" onClick={() => deleteStore(store.name)}>Delete</button>
         </div>          
    ))}
      </>
    );

function deleteStore(storeName){

  axios.post('https://7zvx9g3sm9.execute-api.us-east-2.amazonaws.com/removeStore/removeStore', {
    name: storeName,
  })
  .then(function (response) {
    if(response.data.statusCode === 200){
      const updatedList = listOfStores.filter(obj => obj.name !== storeName)
      setlistOfStores(updatedList);

    }
  })
  .catch(function (error) {
    alert('Store not deleted. Try again')
  });
}

}


export default SiteManager
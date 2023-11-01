import axios from 'axios';
import { boston, worcester } from '../../listofstores';
import React from 'react';


function SiteManager(){
    const [listOfStores, setlistOfStores] = React.useState([ boston, worcester ] )
    const arr = [];
    for (let store of listOfStores) {
        arr.push(
            <div key={store.name}>
            <h2>{store.name}</h2>
            <button name = "Delete" onClick={() => deleteStore(store.name)}>Delete</button>
            </div>
        )
    }

    return arr;


//     axios.get('/stores')
//   .then(function (response) {
//     this.listOfStores = [ boston, worcester ] 

//     for (let store of listOfStores) {
//         <h2>{store.name}</h2>
//     }
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });

function deleteStore(storeName){
    listOfStores.forEach(element => {
        if(storeName === element.name){
            console.log(element.name)
            const index = listOfStores.indexOf(element)
            listOfStores.splice(index, 1)
            setlistOfStores([...listOfStores])
        }
    });
}

}


export default SiteManager
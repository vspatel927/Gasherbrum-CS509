import axios from 'axios';
import React from 'react';
import {useParams } from 'react-router';

function StoreOwner(){
const { name } = useParams();
    return(
    <h2>{name}</h2>
    );
    }


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

// function deleteStore(storeName){
//     listOfStores.forEach(element => {
//         if(storeName === element.name){
//             console.log(element.name)
//             const index = listOfStores.indexOf(element)
//             listOfStores.splice(index, 1)
//             setlistOfStores([...listOfStores])
//         }
//     });
// }


export default StoreOwner
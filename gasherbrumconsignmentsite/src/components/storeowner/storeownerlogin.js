import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const storeArray = [];
function StoreOwnerLogin(){
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
        var check = false
    storeArray.forEach(store => {

        if(username === store.name && password === store.password){
            navigate(`/storeowner/${store.name}`, { state: { name: store.name } });
            check = true
        }
    });
    if(!check){
        alert('Incorrect credentials')
    }
  };

return(
  <div id = "StoreOwnerContainer">

    <div className = "storeLogin">
    <h2>Login to store</h2>
  <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button onClick={handleLogin}>Login</button>
  </div>

    <div id = "storeCreation">
        <StoreCreation />
    </div>
</div>
);
}

function StoreCreation(){
  const [storeName, setStoreName] = useState('');
  const [storePassword, setStorePassword] = useState('');
  const [storeLatitude, setStoreLatitude] = useState('');
  const [storeLongtitude, setStoreLongitutude] = useState('');
  return(
    <div className='storeCreation'>
        <h2>Create Store</h2>
    <input
    type="text"
    placeholder="Store Name"
    value={storeName}
    onChange={(e) => setStoreName(e.target.value)}
  />
  <input
    type="password"
    placeholder="Password"
    value={storePassword}
    onChange={(e) => setStorePassword(e.target.value)}
  />
  <input
    type="text"
    placeholder="Latitude"
    value={storeLatitude}
    onChange={(e) => setStoreLatitude(e.target.value)}
  />

<input
    type="text"
    placeholder="Longtitude"
    value={storeLongtitude}
    onChange={(e) => setStoreLongitutude(e.target.value)}
  />

  <button onClick={() => handleCreation(storeName, storePassword, storeLatitude, storeLongtitude)}>Create Store</button>
</div>
);
}

const handleCreation = (storeName, storePassword, storeLatitude, storeLongtitude) => {
    storeArray.push(
        {
            "name": storeName,
            "password": storePassword,
            "latitude": storeLatitude,
            "longtitude": storeLongtitude
        }
    )
    alert('Created store. Login now')
  };

export default StoreOwnerLogin
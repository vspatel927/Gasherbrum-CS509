import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function StoreOwnerLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {

    axios.post('https://394wko9go8.execute-api.us-east-2.amazonaws.com/storeOwnerLogin/storeOwnerLogin', {
      name: username,
      password: password,
    })
      .then(function (response) {
        if (response.data.statusCode === 200) {
          navigate(`/storeowner/${username}`, { state: { name: username } });
        }
        else {
          alert('Incorrect credentials. Try again.')
        }
      })
      .catch(function (error) {
      });
  }

  return (
    <div id="StoreOwnerContainer">

      <div className="storeLogin">
        <h2>Login to store</h2>
        <input
          type="text"
          placeholder="Store Name (Case Sensitive)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (Case Sensitive)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>

      <div id="storeCreation">
        <StoreCreation />
      </div>
    </div>
  );
}

function StoreCreation() {
  const [storeName, setStoreName] = useState('');
  const [storePassword, setStorePassword] = useState('');
  const [storeLatitude, setStoreLatitude] = useState('');
  const [storeLongtitude, setStoreLongitutude] = useState('');
  return (
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

function handleCreation(storeName, storePassword, storeLatitude, storeLongtitude) {

  axios.post('https://229vplmvf1.execute-api.us-east-2.amazonaws.com/CreateStoreStage/createStore', {
    name: storeName,
    password: storePassword,
    latitude: storeLatitude,
    longitude: storeLongtitude
  })
    .then(function (response) {
      if (response.data.statusCode === 200) {
        alert('Created store. Login now')
      }
    })
    .catch(function (error) {
      alert('Store not created. Try again')
    });
}

export default StoreOwnerLogin
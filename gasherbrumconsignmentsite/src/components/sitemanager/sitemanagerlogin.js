import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SiteManagerLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'master' && password === 'sitemanager') {
      navigate('/sitemanager');
    }
    else {
      alert('Incorrect credentials')
    }
  };

  return (
    <div>
      <h1>Site Manager Login</h1><br></br>
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
      <br />
      <button name="logout" onClick={() => navigate('/')}>Return to Home</button>
      <br />
      <button name="storeownerlogin" onClick={() => navigate('/storeownerlogin')}>Store Owner Login</button>

    </div>
  );
}

export default SiteManagerLogin
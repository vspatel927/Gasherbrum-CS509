import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Navbar } from './../header/header';
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
    <div style={{ backgroundColor: 'rgb(60, 194, 185)' }}>
      <Header />
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
    </div>
  );
}
function Footer() {
  return (
    <div style={{position: 'absolute', bottom: '0', width: '100%'}}>
    <footer style={{ textAlign: 'center', backgroundColor: 'gray', color: 'white', fontStyle: 'italic', marginTop: '250px' }}>
      &copy; 2023 Gasherbrum Project Groups
    </footer>
    </div>
  )
}

export {
  Header,
  Navbar,
  Footer,
};
export default SiteManagerLogin ;
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router"

import './header.css';

import '../compare';


function Header() {
  const navigate = useNavigate();

  const handleSiteManagerLogin = () => {
    navigate('/sitemanagerlogin');
  };

  const handleStoreOwnerLogin = () => {
    navigate('/storeownerlogin');
  };

  return (
    <header>
      <h1>Gasherbrum Computer Store</h1>
      <section className="header">
        <section className="header-top">
          <section className="header-top__logo">
            <a href="/">
              <img src="/images/logo.jpg" alt="Logo" className="header-logo" />
            </a>
          </section>

          <input type="text" placeholder="Search..." style={{ width: '40%' }} />
          
          <nav>
            <ul className="nav-links">
              <li>
                <a href="" onClick={handleSiteManagerLogin}>
                  Site Manager Login
                </a>
              </li>
              <li>
                <a href="" onClick={handleStoreOwnerLogin}>
                  Store Owner Login
                </a>
              </li>
              
            </ul>
          </nav>

          <section className="header-top__navbar">
            <section className="header-top__navigation">
              {/* Assuming Navbar is a valid component */}
              <Navbar />
            </section>
            <hr className="header-top__separator" />
          </section>
        </section>
        <section className="header-bottom">
          <section className="header-bottom__phone">999-478-5555</section>
          <section className="header-bottom__email">Gasherbrum@gmail.com</section>
          <Link to="/compare">
          <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px' }}>
              Compare Computers
             </button>
      </Link>
      
        </section>
      </section>
    </header>
  );
}


function Navbar() {
  return (
    <section className="navbar">
      <Link to="/" className="navbar-item">Shop</Link>
      <Link to="/about" className="navbar-item">About</Link>
      <Link to="/blog" className="navbar-item">Blog</Link>
      <Link to="/contact" className="navbar-item">Contact</Link>
      
    </section>
  );
}
  
  

  export { Header, Navbar };
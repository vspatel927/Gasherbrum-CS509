import React from 'react';

import { useNavigate } from "react-router"
import './header.css';

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
        </section>
      </section>
    </header>
  );
}


function Navbar () {

    return (
      
        <section className="navbar">
          <a href="/" className="navbar-item">Shop</a>
          <a href="/about" className="navbar-item">About</a>
          
          
          <a href="/blog" className="navbar-item">Blog</a>
          <a href="/contact" className="navbar-item">Contact</a>
      </section>
    )
  
  }
  
  

  export { Header, Navbar };
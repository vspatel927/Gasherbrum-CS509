import React from 'react';
import { useNavigate } from "react-router"
import './style.css';
function Home() {
  const  navigate= useNavigate();
  return (
    <div>
      <header>
        <h1>Gasherbrum Computer Store</h1>
        <input type="text" placeholder="Search..." style={{ width: '50%' }} />
        <nav>
          <ul className="nav-links">
          <a href="" onClick={() => navigate('/sitemanagerlogin')}>Site Manager Login</a><br></br>
        <a href="" onClick={() => navigate('/storeownerlogin')}>Store Owner Login</a>
          </ul>
        </nav>
      </header>

      <div id="filter" style={{ position: 'absolute', left: '10px', backgroundColor: 'gray', color: 'white' }}>
        <h2>Filter:</h2>
        <label htmlFor="cpuCheckbox">
          <input type="checkbox" id="cpuCheckbox" /> CPU
        </label>
        <label htmlFor="ramCheckbox">
          <input type="checkbox" id="ramCheckbox" /> RAM
        </label>
        <label htmlFor="modelCheckbox">
          <input type="checkbox" id="modelCheckbox" /> Model
        </label>
        <div style={{ textAlign: 'left' }}>
          <button id="searchButton">Search</button>
        </div>
      </div>
      <br />
      <br />

      <div id="filter" style={{ position: 'absolute', left: '10px', backgroundColor: 'gray', marginTop: '120px', color: 'white' }}>
        <h2>Shops:</h2>
        <label htmlFor="modelCheckbox">
          <input type="checkbox" id="modelCheckbox" /> Shop 1
        </label>
        <label htmlFor="modelCheckbox">
          <input type="checkbox" id="modelCheckbox" /> Shop 2
        </label>
        <label htmlFor="modelCheckbox">
          <input type="checkbox" id="modelCheckbox" /> Shop 3
        </label>
        <label htmlFor="modelCheckbox">
          <input type="checkbox" id="modelCheckbox" /> Shop 4
        </label>
        <div style={{ textAlign: 'left' }}>
          <button id="searchButton">Search</button>
        </div>
      </div>
      <br />
      <br />

      <div id="filter" style={{ position: 'absolute', left: '10px', backgroundColor: 'gray', marginTop: '250px', color: 'white' }}>
        <h2>Inventory:</h2>
        <label htmlFor="allStores">Choose Store:</label>
        <select id="allStores" style={{ color: 'black' }}>
          <option value="store1">Store 1</option>
          <option value="store2">Store 2</option>
          <option value="store3">Store 3</option>
          {/* Add more options for additional stores */}
        </select>
        <label htmlFor="shopList">All Stores:</label>
        <select id="shopList" multiple style={{ color: 'black' }}>
          <option value="shop1">Shop 1</option>
          <option value="shop2">Shop 2</option>
          <option value="shop3">Shop 3</option>
          <option value="shop4">Shop 4</option>
          {/* Add more options for additional shops */}
        </select>
        <div style={{ textAlign: 'left' }}>
          <button id="searchButton" style={{ color: 'black' }}>Search</button>
        </div>
      </div>

      <table style={{ width: '55%', margin: '0 auto', marginTop: '0' }}>
        <thead>
          <tr>
            <th>Price</th>
            <th>Computer Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$999</td>
            <td>
              <div className="computer-details">
                {/* <img src="s3://customersphostos/image/computer.jpg" alt="computer Image" /> */}
                <img src="https://customersphostos.s3.us-east-2.amazonaws.com/image/computer.jpg" alt="Computer Image" />
                <p>HP - 21.5" All-In-One - Intel Celeron - 4GB Memory - 128GB SSD - Snow White</p>
              </div>
              <div className="compare-checkbox">
                <input type="checkbox" />
                <label htmlFor="compareCheckbox">Compare</label>
              </div>
            </td>
            <td><button>Purchase</button></td>
          </tr>
          <tr>
            <td>$90</td>
            <td>
              <div className="computer-details1">
                <img src="https://customersphostos.s3.us-east-2.amazonaws.com/image/computer1.jpg" height="70" alt="Computer Image" />
                <p>HP - 21.5" All-In-One - Intel Celeron - 4GB Memory - 128GB SSD - Snow White</p>
              </div>
              <div className="compare-checkbox">
                <input type="checkbox" />
                <label htmlFor="compareCheckbox">Compare</label>
              </div>
            </td>
            <td><button>Purchase</button></td>
          </tr>
          <tr>
            <td>$19</td>
            <td>
              <div className="computer-details">
                <img src="https://customersphostos.s3.us-east-2.amazonaws.com/image/computer2.jpg" height="50" alt="Keyboard" />
                <p>Logitech - MK470 Full-size Wireless Scissor Keyboard and Mouse Bundle for Windows with Quiet clicks - Off-White</p>
              </div>
              <div className="compare-checkbox">
                <input type="checkbox" />
                <label htmlFor="compareCheckbox">Compare</label>
              </div>
            </td>
            <td><button>Purchase</button></td>
          </tr>
          {/* Add more computer entries as needed */}
        </tbody>
      </table>
      <footer style={{ textAlign: 'center', backgroundColor: 'gray', color: 'white', fontStyle: 'italic', marginTop: '250px' }}>
        &copy; 2023 Gasherbrum Project Groups
      </footer>
    </div>
  );
}

export default Home;

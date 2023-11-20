import { useNavigate } from "react-router"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './style.css';
function Home() {
  const navigate = useNavigate();
  const [listOfStores, setlistOfStores] = useState([]);
  const [showInventory, setShowInventory] = useState(false);
  const [selectedStore, setSelectedStore] = useState('Boston')


  const handleInventory = () => setShowInventory(!showInventory)

  useEffect(() => {
    axios
      .get('https://f96at78893.execute-api.us-east-2.amazonaws.com/getStores/getStores')
      .then((response) => {
        setlistOfStores(response.data.body)
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  return (
    <div style={{ backgroundColor: 'rgb(60, 194, 185)' }} >
      <Header />
      <PartFilter />
      <br />
      <br />

      <StoreList />
      <br />
      <br />

      <StoreInventory />

      {showInventory && <GenerateInventory />}
      <Footer />
    </div>
  );

  function Header() {
    return (
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
    )
  }

  function PartFilter() {
    return (
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
    )
  }

  function StoreList() {
    return (
      <div id="filter" style={{ position: 'absolute', left: '10px', backgroundColor: 'gray', marginTop: '120px', color: 'white' }}>
        <h2>Shops:</h2>
        {listOfStores.map((store) => (
          <label htmlFor="modelCheckbox">
            <input type="checkbox" id="modelCheckbox" key={store.name} /> {store.name}
          </label>
        ))}
        <div style={{ textAlign: 'left' }}>
          <button id="searchButton">Search</button>
        </div>
      </div>
    )
  }

  function StoreInventory() {

    return (
      <div id="filter" style={{ position: 'absolute', left: '10px', backgroundColor: 'gray', marginTop: '250px', color: 'white' }}>
        <h2>Inventory:</h2>
        <label htmlFor="allStores">Choose Store:</label>
        <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} style={{ color: 'black' }}>
          {listOfStores.map((store) => (
            <option value={store.name} key={store.name}>{store.name}</option>
          ))}
        </select>
        <label htmlFor="shopList">All Stores:</label>

        <div style={{ textAlign: 'left' }}>
          <button id="searchButton" style={{ color: 'black' }} onClick={handleInventory}>Search</button>
        </div>
      </div>
    )
  }

  function GenerateInventory() {
    const [inventoryList, setInventoryList] = useState([])

    useEffect(() => {
      axios.post('https://y5fezofh3e.execute-api.us-east-2.amazonaws.com/getStoreInventory/getStoreInventory', {
        name: selectedStore
      })
        .then(function (response) {
          console.log(response)
          setInventoryList(response.data.body)
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    return (
      <>
        <table style={{ width: '55%', margin: '0 auto', marginTop: '0' }}>
          <tr>
            <th class="site-th">Price</th>
            <th class="site-th">Memory</th>
            <th class="site-th">Storage</th>
            <th class="site-th">Processor</th>
            <th class="site-th">Processor Generation</th>
            <th class="site-th">Graphics</th>
            <th class="site-th">Purchase</th>
            <th class="site-th">Compare</th>
          </tr>
          <tbody>
            {inventoryList.map((computer) => (
              <tr key={computer.computer_id}>
                <td class="site-td">${computer.price}</td>
                <td class="site-td">{computer.memory}</td>
                <td class="site-td">{computer.storage}</td>
                <td class="site-td">{computer.processor}</td>
                <td class="site-td">{computer.processor_gen}</td>
                <td class="site-td">{computer.graphics}</td>
                <td class="site-td"><button name="purchase">Purchase</button></td>
                <input type="checkbox" /> </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  function Footer() {
    return (
      <footer style={{ textAlign: 'center', backgroundColor: 'gray', color: 'white', fontStyle: 'italic', marginTop: '250px' }}>
        &copy; 2023 Gasherbrum Project Groups
      </footer>
    )
  }
}

export default Home;

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
      {showInventory && <GenerateInventory />}
      <StoreList />
      <br />
      <br />
      <StoreInventory />
      <PriceFilter />
      <MemoryFilter />
      <StorageFilter />
      <ProcessorFilter />
      <ProcessorGenerationFilter />
      <GraphicsFilter />
      <br />
      <br />
      {/* <Footer /> */}
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

  function PriceFilter() {
    return (
      <div id="filter" style={{width: '150px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
        <h2>Price:</h2>
        <label htmlFor="2001">
          <input type="checkbox" id="cpuCheckbox" /> $2,001 or More
        </label>
        <br />
        <label htmlFor="1501">
          <input type="checkbox" id="ramCheckbox" /> $1,501 - $2,000
        </label>
        <br />
        <label htmlFor="1001">
          <input type="checkbox" id="modelCheckbox" /> $1,001 - $1,500
        </label>
        <br />
        <label htmlFor="501">
          <input type="checkbox" id="modelCheckbox" /> $501 - $1,000
        </label>
        <br />
        <label htmlFor="500">
          <input type="checkbox" id="modelCheckbox" /> $500 or less
        </label>
        <br />
        <div style={{ textAlign: 'left' }}>
          <button id="searchButton">Filter</button>
        </div>
      </div>
    )
  }

  function MemoryFilter(){
    return (
      <div id="filter" style={{width: '150px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
        <h2>Memory (RAM):</h2>
        <label htmlFor="32">
          <input type="checkbox" id="cpuCheckbox" /> 32 GB or More
        </label>
        <br />
        <label htmlFor="16">
          <input type="checkbox" id="ramCheckbox" /> 16 GB
        </label>
        <br />
        <label htmlFor="8">
          <input type="checkbox" id="modelCheckbox" /> 8 GB
        </label>
        <br />
        <label htmlFor="4">
          <input type="checkbox" id="modelCheckbox" /> 4 GB or Less
        </label>
        <br />
        <div style={{ textAlign: 'left' }}>
          <button id="searchButton">Filter</button>
        </div>
      </div>
    )
  }

  function StorageFilter(){
    return (
      <div id="filter" style={{width: '150px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
        <h2>Storage Size:</h2>
        <label htmlFor="2TB">
          <input type="checkbox" id="cpuCheckbox" /> 2 TB or More
        </label>
        <br />
        <label htmlFor="1TB">
          <input type="checkbox" id="ramCheckbox" /> 1 TB
        </label>
        <br />
        <label htmlFor="512">
          <input type="checkbox" id="modelCheckbox" /> 512 GB
        </label>
        <br />
        <label htmlFor="256">
          <input type="checkbox" id="modelCheckbox" /> 256 GB or Less
        </label>
        <br />
        <div style={{ textAlign: 'left' }}>
          <button id="searchButton">Filter</button>
        </div>
      </div>
    )
  }

  function ProcessorFilter(){
    return (
      <div id="filter" style={{width: '150px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
        <h2>Processor:</h2>
        <label htmlFor="Intel">
          <input type="checkbox" id="cpuCheckbox" /> All Intel Processors
        </label>
        <br />
        <label htmlFor="AMD">
          <input type="checkbox" id="ramCheckbox" /> All AMD Processors
        </label>
        <br />
        <div style={{ textAlign: 'left' }}>
          <button id="searchButton">Filter</button>
        </div>
      </div>
    )
  }

  function ProcessorGenerationFilter(){
    return (
      <div id="filter" style={{width: '150px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
      <h2>Processor Generation:</h2>
      <label htmlFor="13th Gen Intel">
        <input type="checkbox" id="cpuCheckbox" /> 13th Gen Intel
      </label>
      <br />
      <label htmlFor="12th Gen Intel">
        <input type="checkbox" id="ramCheckbox" /> 12th Gen Intel
      </label>
      <br />
      <label htmlFor="11th Gen Intel">
        <input type="checkbox" id="modelCheckbox" /> 11th Gen Intel
      </label>
      <br />
      <label htmlFor="AMD Ryzen 7000 Series">
        <input type="checkbox" id="modelCheckbox" /> AMD Ryzen 7000 Series
      </label>
      <br />
      <label htmlFor="AMD Ryzen 6000 Series">
        <input type="checkbox" id="modelCheckbox" /> AMD Ryzen 6000 Series
      </label>
      <br />
      <div style={{ textAlign: 'left' }}>
        <button id="searchButton">Filter</button>
      </div>
    </div>
    )
  }

  function GraphicsFilter(){
    return (
      <div id="filter" style={{width: '150px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
        <h2>Graphics:</h2>
        <label htmlFor="Nvidia">
          <input type="checkbox" id="cpuCheckbox" /> All Nvidia Graphics
        </label>
        <br />
        <label htmlFor="AMD">
          <input type="checkbox" id="ramCheckbox" /> All AMD Graphics
        </label>
        <br />
        <label htmlFor="Intel">
          <input type="checkbox" id="modelCheckbox" /> All Intel Graphics
        </label>
        <br />
        <div style={{ textAlign: 'left' }}>
          <button id="searchButton">Filter</button>
        </div>
      </div>
    )
  }

  function StoreList() {
    return (
      <div id="filter" style={{width: '150px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
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
      <div id="filter" style={{width: '150px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
        <h2>Inventory:</h2>
        <label htmlFor="allStores">Choose Store:</label>
        <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} style={{ color: 'black' }}>
          {listOfStores.map((store) => (
            <option value={store.name} key={store.name}>{store.name}</option>
          ))}
        </select>
        <br />
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
      <div style={{position: 'absolute', bottom: '0', width: '100%'}}>
      <footer style={{ textAlign: 'center', backgroundColor: 'gray', color: 'white', fontStyle: 'italic', marginTop: '250px' }}>
        &copy; 2023 Gasherbrum Project Groups
      </footer>
      </div>
    )
  }
}

export default Home;

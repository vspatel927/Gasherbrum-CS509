import { useNavigate } from "react-router"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './style.css';
function Home() {
  const navigate = useNavigate();

  const [listOfStores, setlistOfStores] = useState([]);
  // const [showInventory, setShowInventory] = useState(false);
  // const [selectedStore, setSelectedStore] = useState('*')

  const [computerList, setComputerList] = useState([])
  const [priceFilter, setPriceFilter] = useState([])
  const [memoryFilter, setMemoryFilter] = useState([])
  const [storageFilter, setStorageFilter] = useState([])
  const [processorFilter, setProcessorFilter] = useState([])
  const [processorGenFilter, setProcessorGenFilter] = useState([])
  const [graphicsFilter, setGraphicsFilter] = useState([])
  const [storeFilter, setStoreFilter] = useState([])

  const [compareList, setCompareList] = useState([])

  const [customerLat, setCustomerLat] = useState(0)
  const [customerLong, setCustomerLong] = useState(0)

  // const handleInventory = () => setShowInventory(!showInventory)

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

  useEffect(() => {
    axios.post('https://trm1ekoc27.execute-api.us-east-2.amazonaws.com/filterComputer/filterComputer', {
      price: priceFilter,
      memory: memoryFilter,
      storageSize: storageFilter,
      processor: processorFilter,
      processorGen: processorGenFilter,
      graphics: graphicsFilter,
      store: storeFilter
    })
      .then(function (response) {
        console.log(response)
        console.log(customerLat)
        // setComputerList([])
        setComputerList(response.data.body)
      })
      .catch(error => {
        console.log(error);
      });
  }, [priceFilter, memoryFilter, storageFilter, processorFilter, processorGenFilter, graphicsFilter, storeFilter]);

  return (
    <div style={{ backgroundColor: 'rgb(60, 194, 185)', }} >
      <Header />
      {/* {showInventory && <GenerateInventory />} */}
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <div class="custContent" style={{ width: '5%' }}>
          <StoreList />
          {/* <StoreInventory /> */}
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
        <div class="custContent" style={{ width: '80%' }}>
          <GenerateFilteredComputers />
        </div>
        <div class="custLocation" style={{width: '15%'}}>
          <CustomerCoordinates />
        </div>
      </div>
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
      <div id="filter" style={{ width: '200px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
        <h2>Price:</h2>
        <label htmlFor="2001">
          <input type="checkbox" id="2001Checkbox" checked={priceFilter.includes("2001+")} onChange={() => handleFilter("2001+", "price")} /> $2,001 or More
        </label>
        <br />
        <label htmlFor="1501">
          <input type="checkbox" id="1501Checkbox" checked={priceFilter.includes("1501to2000")} onChange={() => handleFilter("1501to2000", "price")} /> $1,501 - $2,000
        </label>
        <br />
        <label htmlFor="1001">
          <input type="checkbox" id="1001Checkbox" checked={priceFilter.includes("1001to1500")} onChange={() => handleFilter("1001to1500", "price")} /> $1,001 - $1,500
        </label>
        <br />
        <label htmlFor="501">
          <input type="checkbox" id="501Checkbox" checked={priceFilter.includes("501to1000")} onChange={() => handleFilter("501to1000", "price")} /> $501 - $1,000
        </label>
        <br />
        <label htmlFor="500">
          <input type="checkbox" id="500Checkbox" checked={priceFilter.includes("500-")} onChange={() => handleFilter("500-", "price")} /> $500 or less
        </label>
      </div>
    )
  }

  function MemoryFilter() {
    return (
      <div id="filter" style={{ width: '200px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
        <h2>Memory (RAM):</h2>
        <label htmlFor="32">
          <input type="checkbox" id="32GBCheckbox" checked={memoryFilter.includes("32GB+")} onChange={() => handleFilter("32GB+", "memory")} /> 32 GB or More
        </label>
        <br />
        <label htmlFor="16">
          <input type="checkbox" id="16GBCheckbox" checked={memoryFilter.includes("16GB")} onChange={() => handleFilter("16GB", "memory")} /> 16 GB
        </label>
        <br />
        <label htmlFor="8">
          <input type="checkbox" id="8GBCheckbox" checked={memoryFilter.includes("8GB")} onChange={() => handleFilter("8GB", "memory")} /> 8 GB
        </label>
        <br />
        <label htmlFor="4">
          <input type="checkbox" id="4OrLessCheckbox" checked={memoryFilter.includes("4GB-")} onChange={() => handleFilter("4GB-", "memory")} /> 4 GB or Less
        </label>
      </div>
    )
  }

  function StorageFilter() {
    return (
      <div id="filter" style={{ width: '200px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
        <h2>Storage Size:</h2>
        <label htmlFor="2TB">
          <input type="checkbox" id="2TBCheckbox" checked={storageFilter.includes("2TB+")} onChange={() => handleFilter("2TB+", "storage")} /> 2 TB or More
        </label>
        <br />
        <label htmlFor="1TB">
          <input type="checkbox" id="1TBCheckbox" checked={storageFilter.includes("1TB")} onChange={() => handleFilter("1TB", "storage")} /> 1 TB
        </label>
        <br />
        <label htmlFor="512">
          <input type="checkbox" id="512GBCheckbox" checked={storageFilter.includes("512GB")} onChange={() => handleFilter("512GB", "storage")} /> 512 GB
        </label>
        <br />
        <label htmlFor="256">
          <input type="checkbox" id="256GBCheckbox" checked={storageFilter.includes("256GB-")} onChange={() => handleFilter("256GB-", "storage")} /> 256 GB or Less
        </label>
      </div>
    )
  }

  function ProcessorFilter() {
    return (
      <div id="filter" style={{ width: '200px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
        <h2>Processor:</h2>
        <label htmlFor="Intel">
          <input type="checkbox" id="IntelProcessorCheckbox" checked={processorFilter.includes("All_Intel_Processors")} onChange={() => handleFilter("All_Intel_Processors", "processor")} /> All Intel Processors
        </label>
        <br />
        <label htmlFor="AMD">
          <input type="checkbox" id="AMDProcessorCheckbox" checked={processorFilter.includes("All_AMD_Processors")} onChange={() => handleFilter("All_AMD_Processors", "processor")} /> All AMD Processors
        </label>
      </div>
    )
  }

  function ProcessorGenerationFilter() {
    return (
      <div id="filter" style={{ width: '200px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
        <h2>Processor Generation:</h2>
        <label htmlFor="13th Gen Intel">
          <input type="checkbox" id="13thGenIntelCheckbox" checked={processorGenFilter.includes("13th_Gen_Intel")} onChange={() => handleFilter("13th_Gen_Intel", "processorGen")} /> 13th Gen Intel
        </label>
        <br />
        <label htmlFor="12th Gen Intel">
          <input type="checkbox" id="12thGenIntelCheckbox" checked={processorGenFilter.includes("12th_Gen_Intel")} onChange={() => handleFilter("12th_Gen_Intel", "processorGen")} /> 12th Gen Intel
        </label>
        <br />
        <label htmlFor="11th Gen Intel">
          <input type="checkbox" id="11thGenIntelCheckbox" checked={processorGenFilter.includes("11th_Gen_Intel")} onChange={() => handleFilter("11th_Gen_Intel", "processorGen")} /> 11th Gen Intel
        </label>
        <br />
        <label htmlFor="AMD Ryzen 7000 Series">
          <input type="checkbox" id="AMD7000Checkbox" checked={processorGenFilter.includes("AMD_Ryzen_7000_Series")} onChange={() => handleFilter("AMD_Ryzen_7000_Series", "processorGen")} /> AMD Ryzen 7000 Series
        </label>
        <br />
        <label htmlFor="AMD Ryzen 6000 Series">
          <input type="checkbox" id="AMD6000Checkbox" checked={processorGenFilter.includes("AMD_Ryzen_6000_Series")} onChange={() => handleFilter("AMD_Ryzen_6000_Series", "processorGen")} /> AMD Ryzen 6000 Series
        </label>
      </div>
    )
  }

  function GraphicsFilter() {
    return (
      <div id="filter" style={{ width: '200px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
        <h2>Graphics:</h2>
        <label htmlFor="Nvidia">
          <input type="checkbox" id="NVIDIACheckbox" checked={graphicsFilter.includes("All_NVIDIA_Graphics")} onChange={() => handleFilter("All_NVIDIA_Graphics", "graphics")} /> All Nvidia Graphics
        </label>
        <br />
        <label htmlFor="AMD">
          <input type="checkbox" id="AMDCheckbox" checked={graphicsFilter.includes("All_AMD_Graphics")} onChange={() => handleFilter("All_AMD_Graphics", "graphics")} /> All AMD Graphics
        </label>
        <br />
        <label htmlFor="Intel">
          <input type="checkbox" id="IntelCheckbox" checked={graphicsFilter.includes("All_Intel_Graphics")} onChange={() => handleFilter("All_Intel_Graphics", "graphics")} /> All Intel Graphics
        </label>
      </div>
    )
  }

  function StoreList() {
    return (
      <div id="filter" style={{ width: '200px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
        <h2>Shops:</h2>
        {listOfStores.map((store) => (
          <div>
            <label htmlFor="modelCheckbox">
              <input type="checkbox" id="storeCheckbox" key={store.name} checked={storeFilter.includes(store.name)} onChange={() => handleFilter(store.name, "store")} /> {store.name}
            </label>
            <br />
          </div>
        ))}
      </div>
    )
  }

  // function StoreInventory() {

  //   return (
  //     <div id="filter" style={{width: '150px', left: '10px', backgroundColor: 'gray', color: 'white' }}>
  //       <h2>Inventory:</h2>
  //       <label htmlFor="allStores">Choose Store:</label>
  //       <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} style={{ color: 'black' }}>
  //         {listOfStores.map((store) => (
  //           <option value={store.name} key={store.name}>{store.name}</option>
  //         ))}
  //          <option value="*" key="*">All stores</option>
  //       </select>
  //       <br />

  //       <div style={{ textAlign: 'left' }}>
  //         <button id="searchButton" style={{ color: 'black' }} onClick={handleInventory}>Search</button>
  //       </div>
  //     </div>
  //   )
  // }

  function handleFilter(filter, category) {

    if (category === "price") {
      setPriceFilter((prevCheckedCheckboxes) => {
        const isChecked = prevCheckedCheckboxes.includes(filter);
        return isChecked
          ? prevCheckedCheckboxes.filter((value) => value !== filter)
          : [...prevCheckedCheckboxes, filter];
      });
    }
    if (category === "memory") {
      setMemoryFilter((prevCheckedCheckboxes) => {
        const isChecked = prevCheckedCheckboxes.includes(filter);
        return isChecked
          ? prevCheckedCheckboxes.filter((value) => value !== filter)
          : [...prevCheckedCheckboxes, filter];
      });
    }
    if (category === "storage") {
      setStorageFilter((prevCheckedCheckboxes) => {
        const isChecked = prevCheckedCheckboxes.includes(filter);
        return isChecked
          ? prevCheckedCheckboxes.filter((value) => value !== filter)
          : [...prevCheckedCheckboxes, filter];
      });
    }
    if (category === "processor") {
      setProcessorFilter((prevCheckedCheckboxes) => {
        const isChecked = prevCheckedCheckboxes.includes(filter);
        return isChecked
          ? prevCheckedCheckboxes.filter((value) => value !== filter)
          : [...prevCheckedCheckboxes, filter];
      });
    }
    if (category === "processorGen") {
      setProcessorGenFilter((prevCheckedCheckboxes) => {
        const isChecked = prevCheckedCheckboxes.includes(filter);
        return isChecked
          ? prevCheckedCheckboxes.filter((value) => value !== filter)
          : [...prevCheckedCheckboxes, filter];
      });
    }
    if (category === "graphics") {
      setGraphicsFilter((prevCheckedCheckboxes) => {
        const isChecked = prevCheckedCheckboxes.includes(filter);
        return isChecked
          ? prevCheckedCheckboxes.filter((value) => value !== filter)
          : [...prevCheckedCheckboxes, filter];
      });
    }
    if (category === "store") {
      setStoreFilter((prevCheckedCheckboxes) => {
        const isChecked = prevCheckedCheckboxes.includes(filter);
        return isChecked
          ? prevCheckedCheckboxes.filter((value) => value !== filter)
          : [...prevCheckedCheckboxes, filter];
      });
    }
  }

  function GenerateFilteredComputers() {
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
            {computerList.map((computer) => (
              <tr key={computer.computer_id}>
                <td class="site-td">${computer.price}</td>
                <td class="site-td">{computer.memory}</td>
                <td class="site-td">{computer.storage}</td>
                <td class="site-td">{computer.processor}</td>
                <td class="site-td">{computer.processor_gen}</td>
                <td class="site-td">{computer.graphics}</td>
                <td class="site-td"><button name="purchase">Purchase</button></td>
                <td class="site-td"><input type="checkbox" /> </td></tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  function CustomerCoordinates() {
    const [latText, setLatText] = useState(0)
    const [longText, setLongText] = useState(0)
    return (
      <div id="customerFill" style={{ width: '200px', right: '10px', backgroundColor: 'gray', color: 'white' }}>
        <h2>Submit Customer Location</h2>
        <label for="latitude">Enter Latitude:</label>
        <input
          type="number"
          placeholder="Latitude"
          value={latText}
          onChange={(e) => setLatText(e.target.value)}
        /> <br></br>
        <label for="longtitude">Enter Longtitude:</label>
        <input
          type="number"
          placeholder="Longtitude"
          value={longText}
          onChange={(e) => setLongText(e.target.value)}
        /> <br></br>
        <button onClick={() => (setCustomerLat(latText), setCustomerLong(longText), alert('Location successfully submitted'))}>Submit Location</button>
      </div>
    )
  }

  // function GenerateInventory() {
  //   const [inventoryList, setInventoryList] = useState([])

  //   useEffect(() => {
  //     axios.post('https://y5fezofh3e.execute-api.us-east-2.amazonaws.com/getStoreInventory/getStoreInventory', {
  //       name: selectedStore
  //     })
  //       .then(function (response) {
  //         console.log(response)
  //         setInventoryList(response.data.body)
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }, []);

  //   return (
  //     <>
  //       <table style={{ width: '55%', margin: '0 auto', marginTop: '0' }}>
  //         <tr>
  //           <th class="site-th">Price</th>
  //           <th class="site-th">Memory</th>
  //           <th class="site-th">Storage</th>
  //           <th class="site-th">Processor</th>
  //           <th class="site-th">Processor Generation</th>
  //           <th class="site-th">Graphics</th>
  //           <th class="site-th">Purchase</th>
  //           <th class="site-th">Compare</th>
  //         </tr>
  //         <tbody>
  //           {inventoryList.map((computer) => (
  //             <tr key={computer.computer_id}>
  //               <td class="site-td">${computer.price}</td>
  //               <td class="site-td">{computer.memory}</td>
  //               <td class="site-td">{computer.storage}</td>
  //               <td class="site-td">{computer.processor}</td>
  //               <td class="site-td">{computer.processor_gen}</td>
  //               <td class="site-td">{computer.graphics}</td>
  //               <td class="site-td"><button name="purchase">Purchase</button></td>
  //               <input type="checkbox" /> </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </>
  //   );
  // }

  function Footer() {
    return (
      <div style={{ position: 'absolute', bottom: '0', width: '100%' }}>
        <footer style={{ textAlign: 'center', backgroundColor: 'gray', color: 'white', fontStyle: 'italic', marginTop: '250px' }}>
          &copy; 2023 Gasherbrum Project Groups
        </footer>
      </div>
    )
  }
}

export default Home;

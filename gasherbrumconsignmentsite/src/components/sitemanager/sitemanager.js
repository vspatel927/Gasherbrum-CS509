import axios from 'axios';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router';


function SiteManager() {
  const [listOfStores, setlistOfStores] = useState([]);
  const navigate = useNavigate();


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
    <div class="container">
      <header class="header">
        <h1>Gasherbrum Computer Store Site Manager </h1>
        <input type="text" placeholder="Search..." style={{ width: '50%' }} />
      </header>

      <div id="filter" style={{ position: "absolute", left: "10px", backgroundColor: "gray", color: "white" }}>
        <th colspan="2" class="site-th" >Balance <br />for Site Manager:<br /> $0</th>
        <button name="logout" onClick={() => navigate('/')}>Logout</button>
      </div>
      <br />
      <BalanceList />
      <table style={{ width: "75%", margin: "0 auto", marginTop: "0" }}>
        <thead>
          <tr>
            <th colspan="2" class="site-th"><h2>$$ Inventory for Each Store</h2></th>
          </tr>
          <tr>
            <th class="site-th">Store Name</th>
            <th class="site-th">Inventory Amount ($$)</th>
          </tr>
        </thead>
        <tbody>
          {listOfStores.map((store) => (
            <tr key={store.name}>
              <td class="site-td">{store.name}</td>
              <td class="site-td">${store.inventory}</td>
              <button name="Delete" onClick={() => deleteStore(store.name)}>Delete</button>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total Inventory</td>
            <GetTotalInventory />
          </tr>
        </tfoot>
      </table>
      <footer class="footer">
        &copy; 2023 Gasherbrum Project Groups
      </footer>
    </div>
  );

  function deleteStore(storeName) {

    axios.post('https://7zvx9g3sm9.execute-api.us-east-2.amazonaws.com/removeStore/removeStore', {
      name: storeName,
    })
      .then(function (response) {
        if (response.data.statusCode === 200) {
          const updatedList = listOfStores.filter(obj => obj.name !== storeName)
          setlistOfStores(updatedList);
          alert('Store successfully deleted.')
        }
      })
      .catch(function (error) {
        alert('Store not deleted. Try again')
      });
  }

}

function GetTotalInventory() {

  const [sum, setSum] = useState(0);

  axios
    .get('https://kbeu5tdzv3.execute-api.us-east-2.amazonaws.com/getTotalInventory/getTotalInventory')
    .then((response) => {
      setSum(response.data.body[0].inventorySum)
    })
    .catch(error => {
      console.log(error);
    });

  return <td id="totalBalance">${sum}</td>
}

function BalanceList() {
  return (
    <div>
      <table style={{ width: "75%", margin: "0 auto", marginTop: "0", borderCollapse: 'collapse', border: '1px sold #ccc' }}>
        <thead>
          <th colspan="2" class="site-th" background color="gray"><h2>Balance List</h2></th>
          <tr>
            <th class="site-th">Store Name</th>
            <th class="site-th">Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="site-td">Store 1</td>
            <td class="site-td">$5</td>
          </tr>
          <tr>
            <td class="site-td">Store 2</td>
            <td class="site-td">$15</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><strong>Total Balance</strong></td>
            <td><strong>$20</strong></td>
          </tr>
        </tfoot>
      </table>
      <br /><br /> <br />
    </div>
  );
}


export default SiteManager
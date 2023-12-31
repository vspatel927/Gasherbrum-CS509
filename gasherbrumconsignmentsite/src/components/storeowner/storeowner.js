import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

function StoreOwner() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [showComponent, setShowComponent] = useState(false);
    const [newPrice, setNewPrice] = useState(0)
    const [editState, setEditState] = useState(false)
    const [editingComputer, setEditingComputer] = useState(0)

    const [redrawList, setRedrawList] = useState(0)


    const handleClick = () => setShowComponent(!showComponent)

    return (
        <div class="container">
            <header class="header">
                <h1>{name} Computer Store </h1>
                <input type="text" placeholder="Search..." style={{ width: '50%' }} />
            </header>
            <div style={{ float: 'right' }}>
                <h4>Balance: $0</h4>
                <button name="logout" onClick={() => navigate('/')}>Logout</button>
            </div>
            <table style={{ width: '75%', margin: '0 auto', marginTop: '0', borderCollapse: 'collapse', border: '1px sold #ccc' }}>
                <tbody><tr>
                    <td class="site-td">
                        <AddComputerForm name={name} />

                        <button name="generateStoreInventory" onClick={handleClick}>Generate Inventory</button>
                        {showComponent && <GenerateInventory name={name} />}
                    </td></tr></tbody></table>
            <footer class="footer">
                � 2023 Gasherbrum Project Groups
            </footer>
        </div>
    );


    function AddComputerForm(props) {
        const [price, setPrice] = useState();
        const [memory, setMemory] = useState("32 GB");
        const [storage, setStorage] = useState("2 TB");
        const [processor, setProcessor] = useState("Intel Xeon");
        const [generation, setGeneration] = useState("13th Gen Intel");
        const [graphics, setGraphics] = useState("NVIDIA GeForce RTX 4090");
        const storeName = props.name;

        return (
            <div className='addComputerForm'>
                <h1>Add Computer</h1>
                <table>
                    <tbody><tr>
                        <td class="site-td">
                            <label for="price">Enter Price:</label>
                            <input
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            /> <br></br>

                            <label for="memory">Memory:</label>
                            <select value={memory} onChange={(e) => setMemory(e.target.value)}>
                                <option value="32 GB">32 GB</option>
                                <option value="16 GB">16 GB</option>
                                <option value="12 GB">12 GB</option>
                                <option value="8 GB">8 GB</option>
                                <option value="4 GB">4 GB</option>
                                <option value="1 GB">1 GB</option>
                            </select><br></br>

                            <label for="storage">Storage Size:</label>
                            <select value={storage} onChange={(e) => setStorage(e.target.value)}>
                                <option value="4 TB">4 TB</option>
                                <option value="2 TB">2 TB</option>
                                <option value="1 TB">1 TB</option>
                                <option value="512 GB">512 GB</option>
                                <option value="256 GB">256 GB</option>
                                <option value="128 GB">128 GB</option>
                            </select><br></br>

                            <label for="processor">Processor:</label>
                            <select value={processor} onChange={(e) => setProcessor(e.target.value)}>
                                <option value="Intel Xeon">Intel Xeon</option>
                                <option value="Intel i9">Intel i9</option>
                                <option value="Intel i7">Intel i7</option>
                                <option value="AMD Ryzen 9">AMD Ryzen 9</option>
                                <option value="AMD Ryzen 7">AMD Ryzen 7</option>
                            </select><br></br>

                            <label for="generation">Processor Generation:</label>
                            <select value={generation} onChange={(e) => setGeneration(e.target.value)}>
                                <option value="13th Gen Intel">13th Gen Intel</option>
                                <option value="12th Gen Intel">12th Gen Intel</option>
                                <option value="11th Gen Intel">11th Gen Intel</option>
                                <option value="AMD Ryzen 7000 Series">AMD Ryzen 7000 Series</option>
                                <option value="AMD Ryzen 6000 Series">AMD Ryzen 6000 Series</option>
                            </select><br></br>

                            <label for="graphics">Graphics:</label>
                            <select value={graphics} onChange={(e) => setGraphics(e.target.value)}>
                                <option value="NVIDIA GeForce RTX 4090">NVIDIA GeForce RTX 4090</option>
                                <option value="NVIDIA GeForce RTX 4080">NVIDIA GeForce RTX 4080</option>
                                <option value="AMD Radeon Pro W6300">AMD Radeon Pro W6300</option>
                                <option value="AMD Radeon Pro W6400">AMD Radeon Pro W6400</option>
                                <option value="Intel Integrated Graphics">Intel Integrated Graphics</option>
                                <option value="Intel UHD Graphics 730">Intel UHD Graphics 730</option>
                                <option value="Intel UHD Graphics 770">Intel UHD Graphics 770</option>
                            </select><br></br>

                            <button onClick={() => AddComputerToDB(price, memory, storage, processor, generation, graphics, storeName)}>Add Computer</button>
                        </td></tr></tbody></table>
            </div>
        );
    }

    function AddComputerToDB(price, memory, storage, processor, generation, graphics, storeName) {
        axios.post('https://kwd8xwdtmh.execute-api.us-east-2.amazonaws.com/addComputer/addComputer', {
            price: price,
            memory: memory,
            storage: storage,
            processor: processor,
            generation: generation,
            graphics: graphics,
            name: storeName
        })
            .then(function (response) {

                if (response.data.statusCode === 200) {
                    setRedrawList(redrawList+1)
                    alert('Computer created')
                }
                else {
                    alert('Error. Try again')
                }
            })
            .catch(function (error) {
            });
    }


    function GenerateInventory(storeName) {
        const [inventoryList, setInventoryList] = useState([]);
        useEffect(() => {

            axios.post('https://y5fezofh3e.execute-api.us-east-2.amazonaws.com/getStoreInventory/getStoreInventory', {
                name: storeName.name
            })
                .then(function (response) {
                    console.log(response)
                    setInventoryList(response.data.body)
                })
                .catch(error => {
                    console.log(error);
                });
        }, [editState, redrawList]);
        function removeComputer(computerId, storeName) {
            axios.post('https://bsvojtow49.execute-api.us-east-2.amazonaws.com/removeComputer/removeComputer', {
                id: computerId,
                store: storeName,
            })
                .then(function (response) {
                    if (response.data.statusCode === 200) {
                        setRedrawList(redrawList+1)
                        alert('Computer successfully deleted.');
                    }
                })
                .catch(function (error) {
                    alert('Computer not deleted. Try again.');
                });
        }

        function EditPrice(computerId, storeName, currentPrice) {
            setNewPrice(currentPrice)
            setEditState(true)
            setEditingComputer(computerId)
        }

        function saveNewPrice(computerId, price) {

            axios.post('https://5px943ugag.execute-api.us-east-2.amazonaws.com/modifycomputerprice/modifycomputerprice', {
                id: computerId,
                price: price,
            })
                .then(function (response) {
                    if (response.data.statusCode === 200) {
                        alert('Computer price successfully modified.');
                        setEditState(false)
            setEditingComputer(0)
                    }
                })
                .catch(function (error) {
                    alert('Computer price not modified. Try again.');
                });
            
        }

        return (
            <>
                <table>
                    <tr>
                        <th class="site-th">Price</th>
                        <th class="site-th">Memory</th>
                        <th class="site-th">Storage</th>
                        <th class="site-th">Processor</th>
                        <th class="site-th">Processor Generation</th>
                        <th class="site-th">Graphics</th>
                        <th class="site-th">Modify Price</th>
                        <th class="site-th">Delete</th>
                    </tr>
                    <tbody>
                        {inventoryList.map((computer) => (
                            <tr key={computer.computer_id}>
                                <td class="site-td" id="computer-price">
                                {editState && editingComputer === computer.computer_id ?
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            value={newPrice}
                                            onChange={(e) => setNewPrice(e.target.value)}
                                        />
                                    :
                                    computer.price}</td>
                                <td class="site-td">{computer.memory}</td>
                                <td class="site-td">{computer.storage}</td>
                                <td class="site-td">{computer.processor}</td>
                                <td class="site-td">{computer.processor_gen}</td>
                                <td class="site-td">{computer.graphics}</td>
                                {editState && editingComputer === computer.computer_id ? 
                                    <td class="site-td"><button id="modifyPrice" onClick={() => saveNewPrice(computer.computer_id, newPrice)}>Save</button></td>
                                    :
                                <td class="site-td"><button id="modifyPrice" onClick={() => EditPrice(computer.computer_id, storeName.name, computer.price)}>Modify Price</button></td>}
                                <td class="site-td"><button name="DeleteComputer" onClick={() => removeComputer(computer.computer_id, storeName.name)}> Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }
}

export default StoreOwner
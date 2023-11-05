import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router';

function StoreOwner() {
    const { name } = useParams();
    return (
        <div id="storeContainer">
            <h2>Store Name: {name}</h2>
            <AddComputerForm name={name} />
        </div>
    );
}

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
            <h2>Add Computer</h2>

            <label for="price">Price:</label>
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

            <button onClick={() => AddComputerToDB(price, memory, storage, processor, generation, graphics, storeName)}>Create Store</button>
        </div>
    );
}

function AddComputerToDB(price, memory, storage, processor, generation, graphics, storeName) {
    console.log(generation)
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
            console.log(response);
            if (response.data.statusCode === 200) {
                alert('Computer created')
            }
            else {
                alert('Error. Try again')
            }
        })
        .catch(function (error) {
        });
}

export default StoreOwner
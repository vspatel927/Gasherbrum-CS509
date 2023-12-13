import React, { useState } from 'react';
import { Header, Navbar } from './header/header';
function CompareComputers() {
  const [computer1, setComputer1] = useState({
    name: 'Computer 1',
    cpu: 'Intel i5',
    ram: 8,
    storage: 256,
  });

  const [computer2, setComputer2] = useState({
    name: 'Computer 2',  
    cpu: 'Intel i7',
    ram: 16, 
    storage: 512,
  });

  return (
    <div>
      <Header />
      <h2>Compare Computers</h2>
      
      <div>
        <h3>{computer1.name}</h3>
        <p>CPU: {computer1.cpu}</p>
        <p>RAM: {computer1.ram}GB</p>
        <p>Storage: {computer1.storage}GB</p>
        
        <button onClick={() => setComputer1({
          name: 'New Computer',
          cpu: 'AMD Ryzen 5',  
          ram: 12,
          storage: 1024,  
        })}>Change Computer 1</button>
      </div>

      <div>
        <h3>{computer2.name}</h3>  
        <p>CPU: {computer2.cpu}</p>
        <p>RAM: {computer2.ram}GB</p>
        <p>Storage: {computer2.storage}GB SSD</p>
        
        <button onClick={() => setComputer2({  
          name: 'Newer Computer',
          cpu: 'AMD Ryzen 7',
          ram: 32,
          storage: 2048,
        })}>Change Computer 2</button>  
      </div>
    </div>
  );
}

export default CompareComputers;
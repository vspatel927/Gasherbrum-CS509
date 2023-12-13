import React from 'react';
import { Header, Navbar } from './../header/header';
function About() {

  const teamMembers = [
    {
      name: 'John Doe',
      image: 'john.png',
      role: 'CEO'
    },
    {
      name: 'Omnia Abouhassan',  
      image: 'jane.png',
      role: 'Front-end',
    },
    {
      name: 'Bob Wilson',
      image: 'bob.png',
      role: 'COO'
    } 
  ];

  return (
    <div>
      <Header/>
      <h1>About Us</h1>
      <p>We are a dedicated team working hard to serve our customers.</p>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map(member => (  
            <tr key={member.name}>
              <td>{member.name}</td>
              <td><img src={member.image} alt={member.name} /></td>
              <td>{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default About;
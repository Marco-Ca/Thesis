import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <div id="navBar" style={navBar}>
    <Link className="link" to="/home">Home</Link>
    <Link className="link" to="/logout">Logout</Link>
  </div>
)

const navBar = {
  height: "50px",
  display: "flex",
  justifyContent: "space-evenly",
  textAlign: "center",
  alignItems: "center",
}

export default Navigation;

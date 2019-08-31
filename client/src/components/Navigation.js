import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <div className="navigation">
  <div id="navBar" style={navBar}>
    <Link className="link" to="/home">Home</Link>
    <Link className="link" to="/image_recognition">Image Recognition</Link>
    <Link className="link" to="/object_detection">Object Detection</Link>
  </div>
  </div>
)

const navBar = {
  height: "50px",
  display: "flex",
  justifyContent: "space-between",
  textAlign: "center",
  alignItems: "center"
}

export default Navigation;

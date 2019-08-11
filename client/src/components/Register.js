import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this[e.target.name] = e.target.value;
  }

  handleSubmit() {
    const { first, last, email, password, admin } = this;
    axios.post('/register', {
      first, last, email, password, admin
    }).then(resp => {
      if (resp.data.success) {
        window.location.replace('/home');
      } else {
        this.setState({
          error: true
        });
      }
    });
  }

  render() {
    return (
      <div id="register">
        <h1>Register</h1>
        {this.state.error && <div className="err">Oooops, something went wrong</div>}
        <input autoComplete="off" type="text" placeholder="First Name" name="first" onChange={this.handleInput} />
        <input autoComplete="off" type="country" placeholder="Country" name="last" onChange={this.handleInput} />
        <input autoComplete="off" type="email" placeholder="E-mail Address" name="email" onChange={this.handleInput} />
        <input autoComplete="off" type="password" placeholder="Password" name="password" onChange={this.handleInput} />
        <input id="admin" type="checkbox" name="admin" onChange={this.handleInput} />
        <label id="admin" htmlFor="admin">ADMIN?</label>
        <button onClick={this.handleSubmit}> Register </button>
        <Link to="/login">Click here to Login!</Link>
      </div>
    );
  }
}

export default Register;

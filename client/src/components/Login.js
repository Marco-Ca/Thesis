import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/logout')
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault()
    axios.post('/login', this.state)
      .then(resp => {
        console.log(resp.data)
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
      <div>
        <h1>Login</h1>
        {this.state.error && <div className="err">Oooops, something went wrong</div>}
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} name="email" placeholder="email" />
          <input onChange={this.onChange} name="password" placeholder="password" type="password" />
          <button>Login</button>
        </form>
        <Link to="/register">Click here to Register!</Link>
      </div>
    );
  }
}

export default Login;

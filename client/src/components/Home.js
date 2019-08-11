import React, { Component } from 'react';
import Navigation from './Navigation'
import Countries from './Countries'
import axios from 'axios';
import ReactFlagsSelect from 'react-flags-select';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      is_admin: false
    }
    this.setNewState = this.setNewState.bind(this);
  }

  componentDidMount() {
    // axios.get('/home').then(resp => {
    //   if (!resp.data.success) {
    //     window.location.replace('/register');
    //   } else {
    //     this.setNewState(resp.data.is_admin)
    //   }
    // })
  }

  setNewState(if_admin) {
    this.setState({ is_admin: if_admin })
    console.log(this.state.is_admin)
  }

  render() {
    return (
      <div className="login">
        <Navigation />
        <input autoComplete="off" type="text" placeholder="Name/Nickname" name="name" onChange={this.handleInput} />
        <div class="country">

        <Countries />
        <input autoComplete="off" type="text" placeholder="Name/Nickname" name="name" onChange={this.handleInput} />
        </div>
      </div>
    );
  }
}

export default Home;

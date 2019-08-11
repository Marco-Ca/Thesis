import React, { Component } from 'react';
import ReactFlagsSelect from 'react-flags-select';

class Countries extends Component {
  // constructor() {
  //   super();   
  // }

  componentDidMount() {
    // axios.get('/home').then(resp => {
    //   if (!resp.data.success) {
    //     window.location.replace('/register');
    //   } else {
    //     this.setNewState(resp.data.is_admin)
    //   }
    // })
  }


  render() {
    return (

        <div class="country">

        <ReactFlagsSelect />
        </div>

    );
  }
}

export default Countries;
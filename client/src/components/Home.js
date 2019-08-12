import React, { Component } from 'react';
import Navigation from './Navigation'
import Countries from './Countries'
// import axios from 'axios';
// import ReactFlagsSelect from 'react-flags-select';
import {Button, Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';



class Home extends Component {
  constructor() {
    super();
    this.state = {
			is_admin: false,
			name: "",
			is_it: "",
			is_positive: "",

    }
    this.setNewState = this.setNewState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOption = this.handleOption.bind(this);
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
	
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
		});
	}
	
	handleClick() {
		console.log(this.state)
	}

  setNewState(if_admin) {
    this.setState({ is_admin: if_admin })
    console.log(this.state.is_admin)
	}
	
	handleOption(e) {
		console.log(e.target.value)
	}

  render() {
    return (
			<Grid container justify = "center">
   <div className="login">
        <Navigation />
       
				<TextField
        id="standard-name"
        label="Name"
        className="xx"
        value={this.state.name}
				onChange={this.handleChange}
				name="name"
        margin="normal"
      /><br />
							<TextField
        id="standard-name"
        label="Name"
        className="xx"
        value={this.state.name}
				onChange={this.handleChange}
				name="name"
        margin="normal"
      /><br />
							<TextField
        id="standard-name"
        label="Name"
        className="xx"
        value={this.state.name}
				onChange={this.handleChange}
				name="name"
        margin="normal"
      /><br />
			<Countries /><br />
      <TextField
        id="standard-select-currency-native"
        select
        label="Select Yes or No"
				onChange={this.handleOption}


        SelectProps={{
          native: true,
          MenuProps: {

          },
        }}
        helperText="Are you excited about your future with Artificial Intelligence?"
        margin="normal"
      >
        {[
				{
					value: 'NONE',
					label: ""
				},
				{
					value: 'YES',
					label: 'Yes',
				},
				{
					value: 'No',
					label: 'No',
				}
			].map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
				<br />

		<Button color="secondary" variant="outlined" onClick={this.handleClick}>
      Submit
    </Button>
      </div>
</Grid>
     
    );
  }
}

export default Home;

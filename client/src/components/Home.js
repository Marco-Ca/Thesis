import React, {
	Component
} from 'react';
import Navigation from './Navigation'
import Countries from './Countries'
// import axios from 'axios';
// import ReactFlagsSelect from 'react-flags-select';
import {
	Button,
	Grid
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {
	countries
} from './countries-list.js';
import Select from 'react-select';
import axios from 'axios';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			is_admin: false,
			ip: "",
			name: "",
			selectedOption: null,
			is_it: false,
			is_positive: false,
		}
		this.setNewState = this.setNewState.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleOption = this.handleOption.bind(this);
	}



	componentDidMount() {
		axios.get('https://api.ipify.org').then(resp => {
			if (resp.data) {
				this.setState({ip: resp.data})
			}			
		})
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleClick(e) {
		e.preventDefault()
		const { is_admin, ip, name, selectedOption, is_it, is_positive} = this.state;
		console.log(is_admin, ip, name, selectedOption, is_it, is_positive)
			axios.post('/addParticipant', {is_admin, ip, name, selectedOption, is_it, is_positive}).then(resp => {
		  console.log(resp.data)
		})
	}

	setNewState(if_admin) {
		this.setState({
			is_admin: if_admin
		})
		console.log(this.state.is_admin)
	}

	handleOption(selectedOption) {
		this.setState({
			selectedOption
		});
		console.log(`Option selected:`, selectedOption);
	}

	render() {
		return ( <Grid  container
			direction="column"
			justify="center"
			alignItems="center" >
			<div className = "login" >
			<Navigation />
			<form onSubmit = {
				this.onSubmit
			} >
			<label >
			NAME: < br />
			<input onChange = {
				this.handleChange
			}
			name = "name" />
			</label><br/ >
			<label >
			COUNTRY:
			<Select value = {
				this.selectedOption
			}
			onChange = {
				this.handleOption
			}
			options = {
				countries
			}
			/>
			</label >
			<label >
			<input onChange = {
				this.onChange
			}
			name = "password"
			placeholder = "password"
			type = "password" />
			</label>
			<br/>
			<button onClick={this.handleClick}> Login </ button> 
			</form> 
			</div> 
			</Grid>

		);
	}
}

export default Home;
import React, {
	Component
} from 'react';
import Navigation from './Navigation'
import Countries from './Countries'
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
			is_it: "false",
			is_positive: "false",
			is_new: true,
		}
		this.setNewState = this.setNewState.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleOption = this.handleOption.bind(this);
		this.handleGet = this.handleGet.bind(this);
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleAnswer = this.handleAnswer.bind(this);
	}



	componentDidMount() {
		axios.get('https://api.ipify.org').then(resp => {
			if (resp.data) {
				this.setState({ip: resp.data})				
			}			
		}).then(() => {
			this.handleGet()
		})
	}

	handleGet() {
		axios.post('/getParticipant', {'ip':this.state.ip}).then((data) => {
			if (data.data.success === false) {
				console.log(`FALSE`)
			} else {
				// window.location.replace('/result');
			}
		})
			.catch((e) => console.log(e))
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

	handleOptionChange(e) {
		this.setState({is_it: e.target.value})
	}

	handleAnswer(e) {
		this.setState({is_positive: e.target.value})
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
		return ( 
      <div>
        	<Navigation />
    <Grid  container
			direction="column"
			justify="center"
			alignItems="center" >
			<div className = "login" >
		
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
			<label>
			<input type="radio" value="true" 
										checked={this.state.is_it === "true"} 
										onChange={this.handleOptionChange} />
				Yes
			</label>
			<label>
			<input type="radio" value="false" 
										checked={this.state.is_it === "false"} 
										onChange={this.handleOptionChange} />
				No
			</label>
			<br/>

			<label>
			<input type="radio" value="true" 										
										onChange={this.handleAnswer} />
				Yes I am excited!
			</label>
			<label>
			<input type="radio" value="false" 
											onChange={this.handleAnswer} />
				No I am worried
			</label>
			<br/>
			<button onClick={this.handleClick}> Submit </ button> 
			</form> 
			</div> 
			</Grid>
      </div>
		);
	}
}

export default Home;
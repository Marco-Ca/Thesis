import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import axios from 'axios';

import Navigation from './Navigation';

class Result extends Component {
  constructor() {
    super();
    this.state = {
			data: [],
    	chartData: {
    		labels: [
					'IT Professional Positive Outlook', 
					'IT Professional Negative Outlook', 
					'Non-IT Positive Outlook', 
					'Non-It Negative Outlook'
				],
				datasets: [
					{
						label: 'POINTS',
						backgroundColor: ['#f1c40f', '#e67e22', '#16a085', '#2980b9'],
						data: this.data
					}
				],
			},
			options: {
				cutoutPercentage: 50,
				animation: {
					animateScale: true
				},
				rotation: 3
			},
    };
   
  }

  componentDidMount() {
   axios.get('/results').then((data) => {
		var countArr = []

		for (let count in data.data) {
			countArr.push(data.data[count])
		}

		var datasets = [{
			label: 'POINTS',
			backgroundColor: ['#f1c40f', '#e67e22', '#16a085', '#2980b9'],
			data: countArr
		}]
		this.setState({
			chartData: {...this.state.chartData, datasets: datasets}
		 })
	 })
  }


  render() {
    return (
			<div>
			<Navigation />			
      <div className="chart">
				<Pie
					id="doughnut"
					data={this.state.chartData}
					options={this.state.options}
					height={100}
				/>        
			</div>
			</div>
    );
  }
}

export default Result;

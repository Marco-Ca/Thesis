import React, { Component } from 'react';

import tiger from "./tiger.jpg";
// Importing ml5.js as ml5
import * as ml5 from "ml5";

class ImageRecognition extends Component {
	constructor() {
		super();
	this.state = {
		predictions: [],
		image_src: tiger,
		file: ''
	}
	this.changeImages = this.changeImages.bind(this);
}

  setPredictions = (pred) => {
		// Set the prediction state with the model predictions
		console.log(pred)
    this.setState({
      predictions: pred
    });
  }

  classifyImg = () => {
    // Initialize the Image Classifier method with MobileNet
    const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
    // When the model is loaded
    function modelLoaded() {
      console.log('Model Loaded!');
    }
    // Put the image to classify inside a variable
    const image = document.getElementById('image');
    // Make a prediction with a selected image
    classifier.predict(image, 5, function(err, results) {
    // Return the results
      return results;
    })
      .then((results) => {
        // Set the predictions in the state
        this.setPredictions(results)
      })
	}
	
	changeImages =(e) => {
		e.preventDefault();

    let reader = new FileReader();
		let file = e.target.files[0];
		
		reader.onloadend = () => {
      this.setState({
        file: file,
        image_src: reader.result
      });
    }

		reader.readAsDataURL(file)
		this.classifyImg()

	}

  componentDidMount(){
    // once the component has mount, start the classification
    this.classifyImg();
  }

  render() {
		// First set the predictions to a default value while loading
		
    let predictions = (<div className="loader"></div>);
    // Map over the predictions and return each prediction with probability
    if(this.state.predictions.length > 0){
      predictions = this.state.predictions.map((pred, i) => {
				let { label, confidence } = pred;
				console.log(pred.label)
        // round the confidence with 2 decimal
        confidence = Math.floor(confidence * 10000) / 100 + "%";
        return (
          <div key={ i + "" }>{ i+1 }. Prediction: { label } at { confidence } </div>
        )
      })
    }
	  
    return (
      <div className="App">
			<h1>Image Classification</h1>
			<input className="fileInput" 
            type="file" 
            onChange={(e)=>this.changeImages(e)} />
      <img className="image" onClick={(e)=>this.changeImages(e)} src={ this.state.image_src } id="image" width="400" alt="" />
      { predictions }
      </div>
    );
  }
}

export default ImageRecognition;
import React from "react";
import ReactDOM from "react-dom";
import Navigation from './Navigation'

import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

class ObjectDetection extends React.Component {
	constructor() {
		super();
		this.state = {
			stream: ""
		}
	}
  videoRef = React.createRef();
  canvasRef = React.createRef();

  componentDidMount() {

    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log("This browser does not support the API yet");
    }
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user"
          }
        })
        .then(stream => {
					window.stream = stream;
					this.setState({
						stream: window.stream
					});
          this.videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        })
        .catch((e) => {
          this.detectFrame = () => {};
          return
        });
      const modelPromise = cocoSsd.load();
      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          this.detectFrame(this.videoRef.current, values[0]);
        })
        .catch(error => {
          console.error(error);
        });
    }
	}
	
	componentWillUnmount() {
    this.detectFrame = () => {}
    if (this.state.stream) this.state.stream.getTracks()[0].stop();
	}

  detectFrame = (video, model) => {
    model.detect(video).then(predictions => {
      this.renderPredictions(predictions);
      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
    });
  };

  renderPredictions = predictions => {
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box.
      ctx.strokeStyle = "#4F054F";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#4F054F";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#fff";
      ctx.fillText(prediction.class, x, y);
    });
  };

  render() {
    return (      
      <div>
      <Navigation/>
      <div className="objectDetection">        
        <h1>Object Detection</h1>
        <h6><em>Only works in Google Chrome</em></h6>
        <video
          className="size"
          autoPlay
          playsInline
          muted
          ref={this.videoRef}
          width="600"
          height="500"
        />
        <canvas
          className="size"
          ref={this.canvasRef}
          width="600"
          height="500"
        />
      </div>
      </div>
    );
  }
}

export default ObjectDetection;
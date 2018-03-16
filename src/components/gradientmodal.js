import React, { Component } from 'react';
import '../App.css';
import {Modal} from 'react-bootstrap';
import GradientListComponent from './gradientlistcomp'
const request = require('superagent');

class GradientModal extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      gradients: []
    };
  }

  componentWillMount() {
    request
    .get('https://fast-citadel-80359.herokuapp.com/v1/allgradients')
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if(err){
        console.log(err);
      }
      else{
        this.setState({gradients: res.body});
      }
    });
  }

  componentDidUpdate() {
    request
    .get('https://fast-citadel-80359.herokuapp.com/v1/allgradients')
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if(err){
        console.log(err);
      }
      else{
        this.state.gradients = res.body;      // Define this way to prevent infinite loop
      }
    });
  }

  handleClose() {
    this.setState({ show: false});
  }

  nogradienttext = () => {
    return(
      <h4 style={{fontFamily: 'Montserrat', fontSize: 16, textAlign: 'center'}}>No gradients available.</h4>
    );
  }

  handleShow() {
    this.setState({ show: true});
  }

  render() {
    const gradientList = this.state.gradients.map((gradient) => {
      return(
          <GradientListComponent
            key={gradient._id}
            name={gradient.name}
            color1={gradient.color1}
            color2={gradient.color2}
            upvotes={gradient.upvotes}
            gradient={gradient}
            getGradientData={this.props.getCurrentGradientData}/>
      );
    });

    return (
      <span>
        <Modal show={this.state.show} onHide={this.handleClose} bsSize="large">
          <Modal.Header>
            <Modal.Title style={{fontFamily: 'Montserrat', letterSpacing: 8, textTransform: 'uppercase'}}>Gradients</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.state.gradients.length === 0 ? this.nogradienttext() : gradientList}
          </Modal.Body>
          <Modal.Footer>
            <h5 className="cancelLink" onClick={this.handleClose}>Cancel</h5>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
}

export default GradientModal;

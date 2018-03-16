import React, { Component } from 'react';
import '../App.css';
import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class AddGradientModal extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false});
  }

  handleShow() {
    this.setState({ show: true});
  }

  render() {
    return (
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title style={{fontFamily: 'Montserrat', letterSpacing: 8, textTransform: 'uppercase'}}>Add Gradient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form style={{width: "70%", margin: 'auto', display: 'block'}}>
              <FormGroup>
                <ControlLabel className="colorheading" style={{color: 'black'}}>Add a name to your design</ControlLabel>
                <FormControl
                  onChange={this.props.gradientNameChange}
                  type="text"
                  placeholder="Enter name"
                  className="formInput"
                /><br />
                <Button className="submitbutton" onClick={this.props.addGradient}>Add</Button>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <h5 className="cancelLink" onClick={this.handleClose}>Cancel</h5>
          </Modal.Footer>
        </Modal>
    );
  }
}

export default AddGradientModal;

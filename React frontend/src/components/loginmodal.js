import React, { Component } from 'react';
import '../App.css';
import FormComp from './formcomp';
import {Modal} from 'react-bootstrap';

class ModalComp extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      existingUser: true
    };
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  handleClose() {
    this.setState({ show: false, existingUser: true});
  }

  handleShow() {
    this.setState({ show: true });
  }

  registerHandler = () => {
    this.setState({ existingUser: false});
  }

  registerPrompt = () => {
    if(this.state.existingUser){
      return(<p className="registerPrompt text-center">Don't have an account? <a href="#" onClick={this.registerHandler}>Register Here</a></p>
);
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header>
          <Modal.Title style={{fontFamily: 'Montserrat', letterSpacing: 8, textTransform: 'uppercase'}}>{this.state.existingUser?"Log In":" Register"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form style={{width: "70%", margin: 'auto', display: 'block'}}>
          <FormComp
            login={this.props.login}
            register={this.props.register}
            existingUser={this.state.existingUser}
            usernameChange={this.props.usernameChange}
            emailChange={this.props.emailChange}
            passwordChange={this.props.passwordChange}
            modalClose={this.handleClose}
            isLogged={this.props.isLogged}/>
          <br />
          {this.registerPrompt()}
        </form>
        </Modal.Body>
        <Modal.Footer>
          <h5 className="cancelLink" onClick={this.handleClose}>Cancel</h5>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalComp;

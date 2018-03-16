import React, { Component } from 'react';
import '../App.css';
import {FormGroup,Button, FormControl, ControlLabel} from 'react-bootstrap';

class ModalComp extends Component {

  render() {
    const correctForm = () => {
      if(this.props.existingUser === true){
        return(
          <div>
            <h4 style={{fontFamily: 'Montserrat', fontSize: 16, textAlign: 'center'}}>Save and share your gradients. Browse gradients made by others</h4>
            <br />
            <FormGroup>
              <ControlLabel className="colorheading" style={{color: 'black'}}>Username</ControlLabel>
              <FormControl
                onChange={this.props.usernameChange}
                type="text"
                placeholder="Enter Username"
                className="formInput"
              />
              <br />
              <FormControl.Feedback />
              <ControlLabel className="colorheading" style={{color: 'black'}}>Password</ControlLabel>
              <FormControl
                onChange={this.props.passwordChange}
                ref="password"
                type="password"
                placeholder="Enter password"
                className="formInput"
              />
              <br />
              <Button className="submitbutton" onClick={this.props.login}>Submit</Button>
              <FormControl.Feedback />
            </FormGroup>
          </div>
        );
      }
      else {
        return(
          <div>
            <h4 style={{fontFamily: 'Montserrat', fontSize: 16, textAlign: 'center'}}>Save and share your gradients. Browse gradients made by others</h4>
            <br />
            <FormGroup>
              <ControlLabel className="colorheading" style={{color: 'black'}}>Username</ControlLabel>
              <FormControl
                onChange={this.props.usernameChange}
                type="text"
                placeholder="Enter Username"
                className="formInput"
              />
              <br />
              <ControlLabel className="colorheading" style={{color: 'black'}}>Email</ControlLabel>
              <FormControl
                onChange={this.props.emailChange}
                type="text"
                placeholder="Enter email"
                className="formInput"
              />
              <br />
              <FormControl.Feedback />
              <ControlLabel className="colorheading" style={{color: 'black'}}>Password</ControlLabel>
              <FormControl
                onChange={this.props.passwordChange}
                type="password"
                placeholder="Enter password"
                className="formInput"
              />
              <br />
              <Button className="submitbutton" onClick={this.props.register}>Register</Button>
              <FormControl.Feedback />
            </FormGroup>
          </div>
        );
      }
    }

    return (
      <div>
      {correctForm()}
    </div>
    );
  }
}

export default ModalComp;

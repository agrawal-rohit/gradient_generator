import React, { Component } from 'react';
import '../App.css';
import {Row, Col} from 'react-bootstrap';
import ModalComp from './loginmodal';

class Navbar extends Component {

  onClick = () => {
    this.props.showLoginModal();
  }

  render() {

    const ifLoggedIn = () => {
      if (this.props.isLogged === true) {
        return(
          <Row>
            <Col xs={6} md={6} className="userdesc">
              <h5 className="username">{this.props.username}</h5><br />
              <h5 className="email">{this.props.email}</h5>
            </Col>
            <Col xs={12} md={6}>
              <button type="button" onClick={this.props.onLogout} className="btn">Log Out</button>
            </Col>
          </Row>
        );
      }
      else {
        return(
          <button type="button" onClick={this.onClick} className="btn">Log In</button>
        );
      }
    }

    return (
      <div>
      <nav className="navbar navbar-default topnav">
        <div className="container-fluid">
        <h1>Gradient Generator</h1>
        {ifLoggedIn()}
      </div>
      </nav>
      <ModalComp
        login={this.props.onLogin}
        register={this.props.onRegister}
        onRef={ref => (this.modal1 = ref)}
        usernameChange={this.props.usernameChange}
        emailChange={this.props.emailChange}
        passwordChange={this.props.passwordChange}
        isLogged={this.props.isLogged}/>
    </div>
    );
  }
}

export default Navbar;

import React, { Component } from 'react';
import '../App.css';
import {Row, Col, ButtonGroup, ButtonToolbar, Glyphicon, Button} from 'react-bootstrap';
import CSSModal from './cssmodal';
import GradientModal from './gradientmodal';
import AddGradientModal from './addgradientmodal'

class Navbar2 extends Component {
  state = {
    isMobile: window.innerWidth < 480
  }

  showMobileUpvote = () => {
    if(this.props.name !== "Untitled"){
      const classes = this.props.upvoted? "glyphicon glyphicon-heart" : "glyphicon glyphicon-heart-empty";

      return(
        <Button className="toolButtons" onClick={this.upvoteHandler}>
          <Glyphicon glyph={classes} style={{marginRight: 5}}/>     {this.props.upvotes}
        </Button>
      );
    }
  }

  showDesktopUpvote = () => {
    if(this.props.name !== "Untitled"){
      const classes = this.props.upvoted? "glyphicon glyphicon-heart" : "glyphicon glyphicon-heart-empty";

      return(
        <Button className="toolButtons" onClick={this.upvoteHandler}>
          <Glyphicon glyph={classes} style={{marginRight: 10}} />
          {this.props.upvoted?"Upvoted":"Upvote"} - {this.props.upvotes}
        </Button>
      );
    }
  }

  showMobileAdd = () => {
    if(this.props.name === "Untitled"){
      return(
        <Button className="toolButtons" onClick={this.addGradientHandler}>
          <Glyphicon glyph="glyphicon glyphicon-plus" />
        </Button>
      );
    }
  }

  showDesktopAdd = () => {
    if(this.props.name === "Untitled"){
      return(
        <Button className="toolButtons" onClick={this.addGradientHandler}>
          <Glyphicon glyph="glyphicon glyphicon-plus" style={{marginRight: 10}} />
          Save to all gradients
        </Button>
      );
    }
  }

  upvoteHandler = () => {
    if(this.props.isLogged === true){
      this.props.upvoteHandler();
    }
    else {
      this.props.showLoginModal();
    }
  }

  addGradientHandler = () => {
    if(this.props.isLogged === true){
      this.refs.addgradient.handleShow();
    }
    else {
      this.props.showLoginModal();
    }
  }

  handleWindowResize = () => {
    this.setState({ isMobile: window.innerWidth < 480 });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  showCss = () => {
    this.refs.cssmodal.handleShow();
  }

  showGradients = () => {
    this.refs.gradientmodal.handleShow();
  }

  render() {
    const buttons = () => {
      if(this.state.isMobile === true) {
        return(
          <ButtonGroup style={{margin: 'auto', display: 'block'}}>
            {this.showMobileAdd()}
            <Button className="toolButtons" onClick={this.showCss}>
              <Glyphicon glyph="glyphicon glyphicon-menu-left" />
              <Glyphicon glyph="glyphicon glyphicon-menu-right" />
            </Button>
            {this.showMobileUpvote()}
          </ButtonGroup>
        );
      }
      else {
        return(
          <ButtonGroup>
            {this.showDesktopAdd()}
            <Button className="toolButtons" onClick={this.showCss}>
              <Glyphicon glyph="glyphicon glyphicon-menu-left" />
              <Glyphicon glyph="glyphicon glyphicon-menu-right" style={{marginRight: 10}} />
              Convert to CSS
            </Button>
            {this.showDesktopUpvote()}
          </ButtonGroup>
        );
      }
    }

    const ifPosted = () => {
      if(this.props.name !=="Unititled" && this.props.creator !=="none"){
        return(
          <div>
            <h3 className="title">{this.props.name}</h3>
            <h4 className="colorheading">- posted by {this.props.creator}</h4>
          </div>
        );
      }
    }

    return (
      <div className="container-fluid">
        <Row className="secondnav">
          <Col className="cols" xs={12} md={2}>
            <Button className="browseButton" onClick={this.showGradients}>Browse All Gradients</Button>
          </Col>
          <Col className="cols" xs={12} md={2}>
            {ifPosted()}
          </Col>
          <Col className="cols" xs={12} md={5}>
            <Row>
              <Col xs={2} md={1} style={{marginRight: -10}}>
                <input type="color" value={this.props.color1} onChange={this.props.colorChange1} style={{marginRight: 10}}></input>
              </Col>
              <Col xs={4} md={2}>
                <h1 className="colorheading">Color 1</h1>
                <p className="colorheading" style={{float: 'left'}}>#</p><input type="text" value={this.props.color1.split("#").join("")} maxLength="6" onChange={this.props.colorTextChange1} className="colortextinput"></input>
              </Col>
              <Col xs={2} md={1} style={{marginRight: -10}}>
                <input type="color" value={this.props.color2} onChange={this.props.colorChange2} style={{marginRight: 10}}></input>
              </Col>
              <Col xs={4} md={2}>
                <h1 className="colorheading">Color 2</h1>
                <p className="colorheading" style={{float: 'left'}}>#</p><input type="text" value={this.props.color2.split("#").join("")} maxLength="6" onChange={this.props.colorTextChange2} className="colortextinput"></input>
              </Col>
            </Row>
          </Col>
          <Col className="cols" xs={12} md={3}>
            <ButtonToolbar className="buttonToolbar">
              {buttons()}
            </ButtonToolbar>
          </Col>
        </Row>
        <CSSModal
          ref="cssmodal"
          color1 = {this.props.color1}
          color2 = {this.props.color2}/>
        <GradientModal
          ref="gradientmodal"
          getCurrentGradientData={this.props.getCurrentGradientData}/>
        <AddGradientModal
          gradientNameChange={this.props.gradientNameChange}
          ref="addgradient"
          addGradient={this.props.addGradient}/>
      </div>
    );
  }
}

export default Navbar2;

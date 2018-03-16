import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar.js';
import Navbar2 from './components/navbar2.js';
import Gradient from './components/gradient.js';
import { ToastContainer, toast } from 'react-toastify';
const request = require('superagent');

class App extends Component {
  constructor(){
    super()
    this.state = {
      isLogged: false,      // User Info
      username: "",
      email: "",
      password: "",
      user_id: "",
      name: 'Untitled',     // Gradient Info
      creator: 'none',
      color1: '#ffffff',
      color2: '#fccbde',
      gradient: null,
      upvotes: 0,
      upvoted: false
    }
  }

  upvoteHandler = () => {
    request
    .post('https://fast-citadel-80359.herokuapp.com/v1/upvote')
    .set('Content-Type', 'application/json')
    .send({ name: this.state.name,
            user_id: this.state.user_id }) // query string
    .end((err, res) => {
      if(err){
        toast.error(res.body.error, {
          position: toast.POSITION.TOP_RIGHT,
          className: "badalert"
        });
      }
      else{
        this.setState({gradient: res, upvotes: res.body.upvotes + 1, upvoted: true});
        toast.success('Upvoted!', {
          position: toast.POSITION.TOP_RIGHT,
          className: "alert"
        });
      }
    });
  }

  gradientNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  addGradient = () => {
    if(this.state.name !== "Untitled") {
      request
      .post('https://fast-citadel-80359.herokuapp.com/v1/addgradient')
      .set('Content-Type', 'application/json')
      .send({ name: this.state.name,
              creator_name: this.state.username,
              color1: this.state.color1,
              color2: this.state.color2 }) // query string
      .end((err, res) => {
        if(err){
          toast.error(res.text.error, {
            position: toast.POSITION.TOP_RIGHT,
            className: "badalert"
          });
        }
        else{
          this.setState({name: this.state.name, creator: this.state.username, upvoted: false});
          toast.success('Gradient Added!', {
            position: toast.POSITION.TOP_RIGHT,
            className: "alert"
          });
        }
      });
      this.refs.navbar2.refs.addgradient.handleClose();
    }
    else {
      toast.error("Please provide a name to the gradient", {
        position: toast.POSITION.TOP_RIGHT,
        className: "badalert"
      });
    }
  }

  showLoginModal = () => {
    this.refs.navbar.modal1.handleShow();
  }

  getCurrentGradientData = (gradient) => {
    if(gradient.upvotedBy.includes(this.state.user_id)){
      this.setState({upvoted: true});
    }
    this.setState({gradient: gradient,
                   color1: gradient.color1,
                   color2: gradient.color2,
                   name: gradient.name,
                   creator: gradient.creator_name,
                   upvotes: gradient.upvotes});
    this.refs.navbar2.refs.gradientmodal.handleClose();
  }

  getColor1Info = (event) => {
    if(event.target.value !== this.state.color1)
    this.setState({color1: event.target.value, name: 'Untitled', creator: 'none', upvotes: 0});
  }

  getColor2Info = (event) => {
    if(event.target.value !== this.state.color2)
    this.setState({color2: event.target.value, name: 'Untitled', creator: 'none', upvotes: 0});
  }

  colorTextChangeHandler1 = (event) =>{
    this.setState({color1: "#"+event.target.value});
  }

  colorTextChangeHandler2 = (event) =>{
    this.setState({color2: "#"+event.target.value});
  }

  getUsername = (event) => {
    this.setState({username: event.target.value});
  }

  getEmail = (event) => {
    this.setState({email: event.target.value});
  }

  getPassword = (event) => {
    this.setState({password: event.target.value});
  }

  logoutHandler = () => {
    this.setState({isLogged: false});
  }

  loginHandler = () => {
    let token="";
    request
    .post('https://fast-citadel-80359.herokuapp.com/v1/signin')
    .set('Content-Type', 'application/json')
    .query({ username: this.state.username, password: this.state.password }) // query string
    .end((err, res) => {
      if(err){
        toast.error("Wrong username/ Password", {
          position: toast.POSITION.TOP_RIGHT,
          className: "badalert"
        })
      }
      else{
        token = res.body.token;
        this.setState({email: res.body.email, user_id: res.body.user_id});
        request
        .get('https://fast-citadel-80359.herokuapp.com/v1/protected')
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
        .end((err, res) => {
          if(err){
            toast.error("Wrong email/ Password", {
              position: toast.POSITION.TOP_RIGHT,
              className: "badalert"
            })
          }
          else{
            if(res.text.toLowerCase() === "success"){
              this.setState({isLogged: true});
              this.refs.navbar.modal1.handleClose();
              toast.success('Login Successful', {
                position: toast.POSITION.TOP_RIGHT,
                className: "alert"
              });
            }
          }
        });
      }
    });
  }

  validateEmail = (email) => {
    return (/\S+@\S+\.\S+/).test(email);
  }

  registerHandler = () => {
    if(this.validateEmail(this.state.email)){
      request
      .post('https://fast-citadel-80359.herokuapp.com/v1/signup')
      .set('Content-Type', 'application/json')
      .send({ username: this.state.username, email: this.state.email, password: this.state.password }) // query string
      .end((err, res) => {
        if(err){
          toast.error(JSON.parse(res.text).error, {
            position: toast.POSITION.TOP_RIGHT,
            className: "badalert"
          })
        }
        else{
          this.setState({isLogged: true, user_id: res.body.user_id});
          this.refs.navbar.modal1.handleClose();
          toast.success('Registration Successful', {
            position: toast.POSITION.TOP_RIGHT,
            className: "alert"
          });
        }
      });
    }
    else {
      toast.error("Email not in correct format!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "badalert"
      })
    }
  }

  render() {
    return (
      <div>
        <Navbar isLogged = {this.state.isLogged}
                onLogout = {this.logoutHandler}
                onLogin = {this.loginHandler}
                onRegister = {this.registerHandler}
                username = {this.state.username}
                email = {this.state.email}
                usernameChange={this.getUsername}
                emailChange={this.getEmail}
                passwordChange={this.getPassword}
                showLoginModal={this.showLoginModal}
                ref="navbar"
                />
        <Navbar2 isLogged = {this.state.isLogged}
                 colorChange1={this.getColor1Info}
                 colorChange2={this.getColor2Info}
                 colorTextChange1={this.colorTextChangeHandler1}
                 colorTextChange2={this.colorTextChangeHandler2}
                 color1={this.state.color1}
                 color2={this.state.color2}
                 showLoginModal={this.showLoginModal}
                 name={this.state.name}
                 ref="navbar2"
                 upvotes={this.state.upvotes}
                 upvoted={this.state.upvoted}
                 upvoteHandler={this.upvoteHandler}
                 gradientNameChange={this.gradientNameChange}
                 addGradient={this.addGradient}
                 creator={this.state.creator}
                 getCurrentGradientData={this.getCurrentGradientData}
                 />
        <Gradient color1={this.state.color1}
                  color2={this.state.color2}/>
        <ToastContainer
                  hideProgressBar={true}
                  newestOnTop={true}
                  autoClose={3000}/>
      </div>
    );
  }
}

export default App;

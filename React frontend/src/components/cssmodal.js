import React, { Component } from 'react';
import '../App.css';
import {Modal, Button} from 'react-bootstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';

class CSSModal extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    var code = `background: ${this.props.color2};/* fallback for old browsers */    background: -webkit-linear-gradient(to right, ${this.props.color1}, ${this.props.color2});/* Chrome 10-25, Safari 5.1-6 */    background: linear-gradient(to right, ${this.props.color1}, ${this.props.color2});/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */`
    this.state = {
      show: false,
      value: code,
      copied: false,
    };
  }

  handleClose() {
    this.setState({ show: false});
  }

  handleShow() {
    this.setState({ show: true});
  }

  test = () => {
    toast.success('Copied to Clipboard!', {
      position: toast.POSITION.TOP_RIGHT,
      className: "alert"
    });
  }

  render() {
    return (
      <span>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title style={{fontFamily: 'Montserrat', letterSpacing: 8, textTransform: 'uppercase'}}>CSS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <pre><code style={{color: '#d19a66'}} ref="code">
              background: <span style={{color: '#98b954'}}>{this.props.color2};</span><br /><p style={{color: '#b9b9b9'}}>/* fallback for old browsers */ </p>
              background: <span style={{color: '#98b954'}}>-webkit-linear-gradient(to right, {this.props.color1}, {this.props.color2});</span> <br /><p style={{color: '#b9b9b9'}}>/* Chrome 10-25, Safari 5.1-6 */ </p>
              background: <span style={{color: '#98b954'}}>linear-gradient(to right, {this.props.color1}, {this.props.color2}); </span><br /><p style={{color: '#b9b9b9'}}>/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */</p>
            </code></pre> <br />
            <CopyToClipboard text={this.state.value}
            onCopy={() => this.setState({copied: true})}>
              <Button className="submitbutton" onClick={this.test}>Copy to Clipboard</Button>
            </CopyToClipboard>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <h5 className="cancelLink" onClick={this.handleClose}>Cancel</h5>
          </Modal.Footer>
        </Modal>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={3000}
        />
      </span>
    );
  }
}

export default CSSModal;

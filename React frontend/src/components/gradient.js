import React, { Component } from 'react';
import '../App.css';

class Gradient extends Component{
  render() {
    const styles = {
      exampleStyle: {
        background: 'linear-gradient(to right, ' + this.props.color1 +',' + this.props.color2 + ')',
      }
    };

    return (
      <div className="gradient" style={styles.exampleStyle}></div>
    );
  }
}

export default Gradient;

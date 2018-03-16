import React, { Component } from 'react';
import '../App.css';
import {Row, Col, Glyphicon} from 'react-bootstrap';

class GradientListComponent extends Component {

  onClick = () => {
    const gradient = this.props.gradient;
    this.props.getGradientData(gradient);
  }

  render() {

    const styles = {
      cover: {
        background: 'linear-gradient(to right, ' + this.props.color1 +',' + this.props.color2 + ')',
      }
    };

    return (
      <Col xs={6} md={4}>
        <div>
          <div className="gradientCover" style={styles.cover} onClick={this.onClick}></div>
          <Row>
            <Col xs={12} md={9}>
              <h1 className="gradientTitle">{this.props.name}</h1>
            </Col>
            <Col xs={12} md={3}>
              <p className="gradientUpvotes"><Glyphicon glyph="glyphicon glyphicon-heart" /> {this.props.upvotes}</p>
            </Col>
          </Row>
        </div>
      </Col>
    );
  }
}

export default GradientListComponent;

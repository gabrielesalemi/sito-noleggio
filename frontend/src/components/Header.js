import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import logo from './logo_large.png';


class Header extends Component {
    render() {
      const mystyle = {
        height: "150px",
        float: "left"
      };
      const mystyle1 = {
        padding:"80px"
      };
      return(

        <Container style={mystyle1}>
          <Row>
            <Col sm={6}>
              <img src={logo} alt="Logo" style={mystyle}/>
            </Col>
            <Col sm={6}>
              <h5>Chiamaci: +39123456789</h5>
              <h5>Disponibli 24h su 24</h5> 
            </Col>
          </Row>
        </Container>

      );
    }
}
export default Header;
import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

export default class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
       luogorit : '',
       datarit :'',
       orarit : '',
       luogoric: '',
       dataric:'',
       oraric:'',
       tipov:''
    }
  }


  handleInputChanged = (e) => {

    this.setState({

        [e.target.name]: e.target.value,
    });
}
  handleButtonClicked = (e) => {
      e.preventDefault();

      var luogorit = this.state.luogorit;
      var datarit = this.state.datarit;
      var orarit = this.state.orarit;
      var luogoric = this.state.luogoric;
      var dataric = this.state.dataric;
      var oraric = this.state.oraric;
      var tipov = this.state.tipov;
    window.location.href = 'ricerca/' + luogorit + "/" + datarit + "/" + orarit + "/" + luogoric + "/" + dataric + "/" + oraric + "/" + tipov;
  }
    render() {
      const mystyle = {
        padding:"50px",
        margin: "50px"
      };
      return(
        <Container>
          <div  class="bg_image">

            <h1 style={mystyle}>Noleggia veicoli al miglior prezzo!</h1>
            <form onSubmit={this.handleButtonClicked}>

            <Row>
              <Col>
                    <h1>Dati Ritiro</h1>
                    <Form.Group >
                        <Form.Label>Luogo ritiro</Form.Label>
                        <select class="form-control" aria-label="Default select example" name="luogorit" onChange={this.handleInputChanged} required>
                        <option value="-1" selected></option>
                            <option value="1">Palermo</option>
                            <option value="2">Milano</option>
                            <option value="3">Napoli</option>
                            <option value="4">Catania</option>
                            <option value="5">Roma</option>
                            <option value="6">Torino</option>
                            <option value="7">Firenze</option>
                            <option value="8">Bologna</option>
                            <option value="9">Genova</option>
                            <option value="10">Napoli</option>
                          </select>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Data</Form.Label>
                        <Form.Control type="date"  name="datarit" onChange={this.handleInputChanged} placeholder="Data" />
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Ora</Form.Label>
                        <Form.Control type="time" name="orarit" onChange={this.handleInputChanged} placeholder="Ora" />
                    </Form.Group>
      
                    </Col>
                    <Col >

                    <h1>Dati Riconsegna</h1>

                    <Form.Group >
                        <Form.Label>Luogo riconsegna</Form.Label>
                        <select class="form-control" aria-label="Default select example" name="luogoric" placehoder="Luogo riconsegna" onChange={this.handleInputChanged} required>
                            <option value="-1" selected></option>
                            <option value="1">Palermo</option>
                            <option value="2">Milano</option>
                            <option value="3">Napoli</option>
                            <option value="4">Catania</option>
                            <option value="5">Roma</option>
                            <option value="6">Torino</option>
                            <option value="7">Firenze</option>
                            <option value="8">Bologna</option>
                            <option value="9">Genova</option>
                            <option value="10">Napoli</option>
                          </select>
                    </Form.Group>
                  
                  
                    <Form.Group>
                        <Form.Label>Data</Form.Label>
                        <Form.Control type="date" name="dataric" onChange={this.handleInputChanged} placeholder="Data" />
                    </Form.Group>
                   
                    <Form.Group>
                        <Form.Label>Ora</Form.Label>
                        <Form.Control type="time" name="oraric" onChange={this.handleInputChanged} placeholder="Ora" />
                    </Form.Group>
                   </Col>
                   </Row>
                    <Row>

                    
                    <Col>
                    
                     
                    <Form.Group >
                        <Form.Label>Tipo di veicolo</Form.Label>
                        <select class="form-control" aria-label="Default select example" name="tipov" placehoder="Tpo di veicolo" onChange={this.handleInputChanged} required>
                            <option value="-1" selected></option>
                            <option value="macchina">Macchina</option>
                            <option value="bicicletta">Bicicletta</option>
                            <option value="moto">Moto</option>
                            <option value="monopattino">Monopattino</option>
                          </select>
                    </Form.Group>
                    <button className="btn btn-success" type="submit">
                            Cerca
                    </button> 
                    </Col>
                    </Row>

             </form> 

       </div>
       </Container>




      );
    }
}

import React, {Component} from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../App.css';
import UserServiceApi from '../api/UserServiceApi.js';
import Form from 'react-bootstrap/Form';

class Prenotazione extends Component{

    constructor(props) {
        super(props);

        this.state = {
            id_pren:  this.props.match.params.par1,
            giustifica: '',
            luogoric: '',
            elimina: ''
        }
    }

    handleInputChanged = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const user = {
            giustifica: this.state.giustifica,
            luogoric:  this.state.luogoric,
            elimina: this.state.elimina,
            id_pren: this.state.id_pren,
        }
        UserServiceApi.updatePrenotazione(user).then(res => {
            alert("modifica avvenuta con successo");
            window.location.href="/profilo";
        }).catch((error) => {
        });
    
    }


    render(){
        return(

            <Container>
                <h1>Modifica i dati della tua prenotazione</h1>
                <Row>
                    <form onSubmit = {this.handleUpdate}>
                    <Col sm={12}>
                        <Form.Group >
                        <Form.Label>Variazione luogo consegna</Form.Label>
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
                    </Col>
                    <Col sm={12}>
                        <Form.Group >
                            <Form.Label>Giustifica ritardo consegna</Form.Label>
                            <input type = "text" name="giustifica" onChange={this.handleInputChanged}/>
                        </Form.Group>

                    </Col>
                    <Col sm={12}>
                    <Form.Group >
                            <Form.Label>Elimina prenotazione</Form.Label>
                            <input type = "checkbox" name="elimina" onChange={this.handleInputChanged}/>
                        </Form.Group>
                    </Col>
                    <button className="btn btn-success" type="submit">
                            Modifica
                        </button>   
                    </form>
                </Row>

            </Container>


        );

    }
}


export default Prenotazione;

import React, {Component} from "react";
import Axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../App.css';
import Form from 'react-bootstrap/Form';
import UserServiceApi from '../api/UserServiceApi.js';


class Datiprenotazione extends Component{

    constructor(props) {
        super(props);

        this.state = {
            autista:'',
            nuovoritiro: '',
            patente:'',
            nome:'',
            id_pren: this.props.match.params.par2,
            id_utente: UserServiceApi.getLoggedInUserID(),
        }
    }



    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const url = 'http://localhost:9000/calcolotariffa';
        const user = {
            autista: this.state.autista,
            nuovoritiro:  this.state.nuovoritiro,
            patente: this.state.patente,
            nome: this.state.nome,
            id_utente:this.state.id_utente, 
            id_pren: this.state.id_pren
        }
        Axios.post(url, user).then((res) => {
            alert("prenotazione avvenuta con successo");
            window.location.href="/profilo";
        }).catch((e) => {
        });
    
    }


    render(){
  
        return(

            <Container>
                <Row>
                    <h1> COMPLETA I DATI DELLA PRENOTAZIONE</h1>
                <form onSubmit={this.handleSubmit}>
                    <Col sm = {12}>
                        <input type = "checkbox" name = "autista" onChange={this.handleInputChange}/><p>Desideri l'autista per il veicolo selezionato? La mancia è obbligatoria di 5 euro.</p>

        

                    </Col>
                    <Col sm = {12}>

                        <p> Vuoi modificare la posizione del ritiro del veicolo?</p>
                        <Form.Group >
                            <Form.Label>Luogo ritiro</Form.Label>
                            <select class="form-control" aria-label="Default select example" name="nuovoritiro" placehoder="Luogo riconsegna" onChange={this.handleInputChange} required>
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
                    <Col sm = {12}>

                    <p> Inserisci i dati di chi guiderà il veicolo se non hai scelto l'autista</p>
                    <Form.Group >
                            <Form.Label>Dati conducente</Form.Label>
                            <Form.Control type="text"  name="nome" onChange={this.handleInputChange} placeholder="Nome autista"/>
                            <Form.Control type="text"  name="patente" onChange={this.handleInputChange} placeholder="Codice patente"/>
                    </Form.Group>
                    <button className="btn btn-success" type="submit">
                            Create
                        </button>   
                    </Col>

                    </form> 
                </Row>
            
            </Container>


        );
    }




}

export default Datiprenotazione;
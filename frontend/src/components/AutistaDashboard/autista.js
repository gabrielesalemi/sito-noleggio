import React, {Component} from "react";
import Axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import AutistaServiceApi from '../../api/AutistaServiceApi';
import UserServiceApi from '../../api/UserServiceApi';


class Autista extends Component{

    constructor(props) {
        super(props);

        this.state = {
           id_pren:[''],
           id_pren_autista:[''],
           p:'', 
           pren:'',
           id_autista: UserServiceApi.getLoggedInUserID()
        }
    }



    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleInputChanged = (e) => {

        this.setState({
    
            p: e.target.value,
            pren: e.target.value
        });
    }

    callApi(){

        Axios.get("http://localhost:9000/autista/prenotazioni/",{
            params: {
            }
        }
        )
        .then(res => {
            for(let x = 0; x<res.data.length; x++){
                this.setState({ 
                id_pren: this.state.id_pren.concat([res.data[x].id_prenotazione])
                })
            }
        });

    }

    callFunction(){
        Axios.get("http://localhost:9000/autista/prenotazioniautista/",{
            params: {
                id_autista:this.state.id_autista
            }
        }
        )
        .then(res => {
            for(let x = 0; x<res.data.length; x++){
                this.setState({ 
                id_pren_autista: this.state.id_pren_autista.concat([res.data[x].id_prenotazione])
                })
            }
        });
    }

    componentWillMount(){
        this.callApi();
        this.callFunction();

    }

    handlePren = (e) => {
        e.preventDefault();
        const pren = {
            id_autista: this.state.id_autista, 
            p:this.state.p
        }
        AutistaServiceApi.updatePrenotazione(pren).then(res => {
            alert("Prenotazione modificata con successo");
            window.location.href="autista";
        }).catch((error) => {
            alert("Dati non modificati, non puoi modificare entrambi i checkbox");
        });
    }

    handleDeletePren = (e) => {
        e.preventDefault();
        const pren = {
            id_autista: this.state.id_autista, 
            pren:this.state.pren
        }
        AutistaServiceApi.deletePrenotazione(pren).then(res => {
            alert("Prenotazione eliminata con successo");
            window.location.href="autista";
        }).catch((error) => {
            alert("Dati non modificati, non puoi modificare entrambi i checkbox");
        });
    }



    

    render(){
        if(UserServiceApi.typeofUser() == "autista"){

        return(
            <Container>
            <h1>Scegli nuove corse, oppure escluditi da una delle corse.</h1>
            <Row>
                <form onSubmit = {this.handlePren}>
                <Col sm={12}>
                    <Form.Group >
                    <Form.Label>Scegli una delle corse:</Form.Label>
                        <select className="form-control" value={this.state.p} onChange={this.handleInputChanged}>
                        {this.state.id_pren.map(item => (
                        <option value={item.id_prenotazione} >{item}</option>
                        ))}
                    </select>
                </Form.Group>
                </Col>
                <button className="btn btn-success" type="submit">
                        Scegli
                    </button>   
                </form>
            </Row>
            <Row>
                <form onSubmit={this.handleDeletePren}>
                <Col sm={12}>
                    <Form.Group >
                    <Form.Label>Escluditi da una delle corse:</Form.Label>
                        <select className="form-control" value={this.state.pren} onChange={this.handleInputChanged}>
                        {this.state.id_pren_autista.map(item => (
                        <option value={item.id_prenotazione} >{item}</option>
                        ))}
                    </select>
                </Form.Group>
                </Col>
                <button className="btn btn-success" type="submit">
                        Elimina
                    </button>   
                </form>
            </Row>
        </Container>
          
        );
        }
        else{
            return(
                <h1>Non hai i permessi necessari</h1>
            );
        }
    }




}

export default Autista;
import React, {Component} from "react";
import Axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import AdminServiceApi from '../../api/AdminServiceApi';
import UserServiceApi from '../../api/UserServiceApi';


class Autista extends Component{

    constructor(props) {
        super(props);

        this.state = {
           id_pren:[''],
           id_pren_autista:[''],
           p:'', 
           autista:'',
           id_autista: UserServiceApi.getLoggedInUserID()
        }
    }



    handleInputChanged = (e) => {

        this.setState({
    
            p: e.target.value,
            autista: e.target.value
        });
    }

    callApi(){

        Axios.get("http://localhost:9000/admin/autistisenzacorsa/",{
            params: {
            }
        }
        )
        .then(res => {
            for(let x = 0; x<res.data.length; x++){
                this.setState({ 
                id_pren_autista: this.state.id_pren_autista.concat([res.data[x].id_utente])
                })
            }
        });

    }

    callFunction(){
        Axios.get("http://localhost:9000/admin/prenotazionisenzaautista/",{
            params: {
                id_autista:this.state.id_autista
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

    componentWillMount(){
        this.callApi();
        this.callFunction();

    }

    handlePren = (e) => {
        e.preventDefault();
        const pren = {
            autista: this.state.autista, 
            p:this.state.p,
        }
        AdminServiceApi.updatePrenotazione(pren).then(res => {
            alert("Prenotazione modificata con successo");
            window.location.href="autista";
        }).catch((error) => {
            alert("Dati non modificati, non puoi modificare entrambi i checkbox");
        });
    }





    

    render(){
        if(UserServiceApi.typeofUser() == "admin"){

        return(
            <Container>
            <h1>Assegna un autista ad una corsa.</h1>
            <form onSubmit = {this.handlePren}>
            <Row>
                <Col sm={12}>
                    <Form.Group >
                    <Form.Label>Scegli una delle corse senza autista assegnato:</Form.Label>
                        <select className="form-control" value={this.state.p} onChange={this.handleInputChanged}>
                        {this.state.id_pren.map(item => (
                        <option value={item.id_prenotazione} >{item}</option>
                        ))}
                        </select>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <Form.Group >
                    <Form.Label>Scegli un'autista senza corse:</Form.Label>
                        <select className="form-control" value={this.state.autista} onChange={this.handleInputChanged}>
                        {this.state.id_pren_autista.map(item => (
                        <option value={item.id_prenotazione} >{item}</option>
                        ))}
                    </select>
                </Form.Group>
                <button className="btn btn-success" type="submit">
                        Scegli
                    </button>   
                </Col>

            </Row>
            </form>
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
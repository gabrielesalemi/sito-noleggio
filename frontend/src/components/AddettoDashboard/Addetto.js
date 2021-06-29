import React, {Component} from "react";
import Axios from "axios";
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Cookie from "universal-cookie";
import Form from 'react-bootstrap/Form';
import AddettoServiceApi from '../../api/AddettoServiceApi';
import UserServiceApi from '../../api/UserServiceApi';


class Addetto extends Component{

    constructor(props) {
        super(props);

        this.state = {
           id_pren:[''],
           ritiro:'',
           riconsegna:'', 
           p:'', 
           id_addetto: UserServiceApi.getLoggedInUserID()
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
        });
    }

    callApi(){

        Axios.get("http://localhost:9000/addetto/allposts/",{
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

    componentWillMount(){
        this.callApi();
    }

    handlePren = (e) => {
        e.preventDefault();
        const pren = {
            ritiro:this.state.ritiro,
            riconsegna:this.state.riconsegna,
            id_addetto: this.state.id_addetto, 
            p:this.state.p
        }
        AddettoServiceApi.updatePrenotazione(pren).then(res => {
            alert("Dati modificati con successo");
            window.location.href="Addetto";
        }).catch((error) => {
            alert("Dati non modificati, non puoi modificare entrambi i checkbox");
        });
    }
    

    render(){
        if(UserServiceApi.typeofUser() == "addetto"){
        return(
            <Container>
            <h1>Modifica i dati della tua prenotazione</h1>
            <Row>
                <form onSubmit = {this.handlePren}>
                <Col sm={12}>
                    <Form.Group >
                    <Form.Label>Scegli la prenotazione da modificare:</Form.Label>
                        <select className="form-control" value={this.state.p} onChange={this.handleInputChanged}>
                        {this.state.id_pren.map(item => (
                        <option value={item.id_prenotazione} >{item}</option>
                        ))}
                    </select>
                </Form.Group>
                </Col>
                <Col sm={12}>
                    <Form.Group >
                        <Form.Label>Il veicolo è stato ritirato o riconsegnato?</Form.Label>
                            <h3>Ritirato:</h3>
                            <input type="checkbox"  name="ritiro" onChange={this.handleInputChange} placeholder=""/>
                            <h3>Riconsegnato:</h3>
                            <input type="checkbox"  name="riconsegna" onChange={this.handleInputChange} placeholder=""/>
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
        else{
            return(
                <h1>Non hai i permessi necessari</h1>
            );
        }
    
    }




}

export default Addetto;
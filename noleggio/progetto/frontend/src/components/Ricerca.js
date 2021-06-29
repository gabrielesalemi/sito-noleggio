import React, {Component} from "react";
import Axios from "axios";
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../App.css';
import UserServiceApi from '../api/UserServiceApi.js';

class Ricerca extends Component{

    constructor(props) {
        super(props);

        this.state = {
            posiz_rit:  this.props.match.params.par,
            data_rit: this.props.match.params.par2,
            ora_rit: this.props.match.params.par3,
            posiz_ric:this.props.match.params.par4,
            data_ric: this.props.match.params.par5,
            ora_ric: this.props.match.params.par6,
            tipov: this.props.match.params.par7,
            id_utente: UserServiceApi.getLoggedInUserID(),
            targa_veicolo: '',
            id_autista:'',
            veicolo:[{nome:'', targa:''}]
        }

      }
      handleInputChanged = (e) => {

        this.setState({
    
            targa_veicolo: e.target.value,
        });
    }

      callApi(){

        Axios.get("http://localhost:9000/ricerca/",{
            params: {
                posiz_rit: this.state.posiz_rit,
                data_rit:this.state.data_rit,
                ora_rit:this.state.ora_rit,
                posiz_ric:this.state.posiz_ric,
                data_ric:this.state.data_ric,
                ora_ric:this.state.ora_ric,
                tipov: this.state.tipov
            }
        }
        )
        .then(res => {
          for(let x = 0; x<res.data.length; x++){
            this.setState({ 
            veicolo: this.state.veicolo.concat([{nome:res.data[x].nome, targa:res.data[x].targa}])
            })
        }
          })
          .catch(
            function (error) {
              alert('Non risultano veicoli relativi alla tua ricerca');
            }
          );
    }

    componentWillMount(){
        this.callApi();
    }

    handleSubmitPren = (e) => {
      e.preventDefault();

      const url = 'http://localhost:9000/prenotazione';
      const user = {
        id_utente:  this.state.id_utente,
        targa_veicolo: this.state.targa_veicolo,
        posiz_rit: this.state.posiz_rit,
        data_rit:this.state.data_rit,
        ora_rit:this.state.ora_rit,
        posiz_ric:this.state.posiz_ric,
        data_ric:this.state.data_ric,
        ora_ric:this.state.ora_ric,
      }
      UserServiceApi.prenotazione(user).then(res => {
        let pren = res.data[0].id_prenotazione;
        window.location.href = `/datiprenotazione/` + pren;
    }).catch((error) => {
        alert("Per prenotare devi essere registrato");
    });
   
    }
    
     
    render(){

        return(
              <Container>
                <Row >
                <form onSubmit = {this.handleSubmitPren}>
                {this.state.veicolo.map(item => (
                 
                  <Col sm={12}> 
                   
            <Card style={{ width: '70rem' }}>

              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                <label for="autista"> Macchina:   </label> {item.nome} 
                <label for="autista"> Targa: </label> {item.targa}             
                </Card.Text>
                
              </Card.Body>
         
              
            </Card> 
            
            </Col>
               
            ))}
             <Card.Body>
             <select value={this.state.targa_veicolo} onChange={this.handleInputChanged}>
            {this.state.veicolo.map(item => (
              <option value={item.targa}>{item.targa}</option>
            ))}
                       </select>

              <button className="btn btn-success" type="submit">
                            Prenota veicolo
                </button> 
              </Card.Body>
            </form>      

            </Row>
            </Container>
          
        );
    }
       
    
}
export default Ricerca;

import React, { Component } from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Home from './components/Index.js';
import Login from './components/Login.js';
import Profilo from './components/Profilo.js';
import Ricerca from './components/Ricerca.js';
import Datiprenotazione from './components/Datiprenotazione.js';
import Error from './components/Error.js';
import Prenotazione from './components/Prenotazione.js';
import Autista from './components/AutistaDashboard/autista';
import Addetto from './components/AddettoDashboard/Addetto';
import Admin from './components/AdminDashboard/admin';

import Header from './components/Header';
import Footer from './components/Footer';

import NavBar from './components/NavBar.js';

import './App.css';

class App extends Component {
  constructor() {
    super();
   
  }

  render() {
    
    return (
    <BrowserRouter> 
    <Header/>
     <NavBar />
          <Container fluid="true">
          <Row>
          <Col>
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/login" component={Login}/>
             <Route path="/profilo" component={Profilo}/>
             <Route path="/ricerca/:par/:par2/:par3/:par4/:par5/:par6/:par7" component={Ricerca}/>
             <Route path="/prenotazione/:par1" component={Prenotazione}/>}
             <Route path="/datiprenotazione/:par2" component={Datiprenotazione}/>
             <Route path="/admin" component={Admin}/>
             <Route path="/autista" component={Autista}/>
             <Route path="/addetto" component={Addetto}/>
             <Route component={Error}/>
           </Switch>
           </Col>
           </Row>
           <Footer/>
        </Container> 
    </BrowserRouter>
    
    );
  }
}
export default App;
render(<App />, document.getElementById('root'));

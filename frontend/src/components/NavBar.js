import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import UserServiceApi from '../api/UserServiceApi';


class NavBar extends Component {
render() {
  const isUserLoggedIn = UserServiceApi.isUserLoggedIn();


  return(
    <div>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
          <Navbar.Brand href="/">Noleggio</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">          
            <Nav className="mr-auto">           
             <Nav.Link href="/" id="home">Home</Nav.Link>
             <Nav.Link href="/login" id="about">Login/Registrazione</Nav.Link>
             <Nav.Link href="/profilo" id="">Profilo</Nav.Link>       
             {isUserLoggedIn &&
                        <>
                            {UserServiceApi.typeofUser() == "autista" && <Nav.Link href="/autista">Gestione Autista</Nav.Link>}
                        </>
              }
              {isUserLoggedIn &&
                        <>
                            {UserServiceApi.typeofUser() == "addetto" && <Nav.Link href="/addetto">Gestione Addetto consegne/riconsegne</Nav.Link>}
                        </>
              }
              {isUserLoggedIn &&
                        <>
                            {UserServiceApi.typeofUser() == "admin" && <Nav.Link href="/admin">Gestione Admin</Nav.Link>}
                        </>
              }
            </Nav>          
          </Navbar.Collapse>
      </Navbar>
   </div>
      );
    }
  }
export default NavBar;
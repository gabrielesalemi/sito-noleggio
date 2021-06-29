import React, {Component} from "react";
import Axios from "axios";
import UserServiceApi from '../api/UserServiceApi.js';
import Cookie from "universal-cookie";

import '../App.css';

class Profilo extends Component{
    constructor(props){
        super(props);
        this.state={
        username: '',
        cookies:"",
        id_pren: [''],
        p:"",
        nome:'',
        cognome:'',
        username: '',
        password: '',
        email: '',
        credito:''
        };
    }


    handleInputChanged = (e) => {

        this.setState({
    
            p: e.target.value,
        });
    }

    handleInputChange = (e) => {

        this.setState({
    
            [e.target.name]: e.target.value,
        });
    }

    
     callApi(){

        Axios.get("http://localhost:9000/posts/",{
            params: {
                username: UserServiceApi.getLoggedInUserID()
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

 

    logout(){
        UserServiceApi.logout();
    }

    handlePren = (e) => {
        e.preventDefault();
        let p = this.state.p;
        window.location.href="/prenotazione/" + p ;
    }

    handleSubmitReg = (e) => {
        e.preventDefault();
        const user = {
            nome: this.state.nome,
            cognome: this.state.cognome,
            username: this.state.username, 
            password: this.state.password,
            email: this.state.email,
            credito:this.state.credito,
            id_utente : UserServiceApi.getLoggedInUserID()
        }
        UserServiceApi.updateUser(user).then(res => {
            window.location.href = `./profilo`;
            alert("Dati modificati con successo");
        }).catch((error) => {
            alert("Dati non modificati");
        });
    }
    



   
    render(){
        const mystyle = {
            padding:"50px",
        };
        if(UserServiceApi.isUserLoggedIn()){
        return(
            <div className="App">
                <div style={mystyle}>
                    <h2 >ciao {UserServiceApi.getLoggedInUserID()}</h2>

                </div>
                <div style={mystyle}>
                    <h3>Clicca qui per effettuare il logout</h3>
                    <button className="btn btn-success" onClick={this.logout}>Logout</button>
                </div>
                {UserServiceApi.typeofUser() != "admin" && UserServiceApi.typeofUser() != "addetto" && UserServiceApi.typeofUser() != "autista" &&
                    <>
                    <div style={mystyle}>
                        <h3>Scegli la prenotazione da modificare</h3>
                        <form onSubmit = {this.handlePren}>
                    <select value={this.state.p} onChange={this.handleInputChanged}>
                        {this.state.id_pren.map(item => (
                        <option value={item.id_prenotazione} >{item}</option>
                        ))}
                    </select>
                    <h3>Modifica</h3>
                    <button className="btn btn-success">Clicca qui</button>
                    </form>
                    </div>

                    <div style={mystyle}>
                        <h3>Scegli i dati che vuoi modificare</h3>
                        <form onSubmit={this.handleSubmitReg}>
                    <input type="text"  name="nome" id="nome"  placeholder="Nome" onChange={this.handleInputChange}/>
                     <input type="text"  name="cognome" id="nome"  placeholder="Cogome" onChange={this.handleInputChange}/>

                     <input type="password" name="password" id="pass" placeholder="Password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$" onChange={this.handleInputChange}/>
                     <input type="password" name = "repass" id="repass" placeholder="Confirm Password" onChange={this.handleInputChange}/>
                     <input type="text" name="email" id="email"  placeholder="Enter your Email" onChange={this.handleInputChange}/>
                    <input type="text" name="username" id="username"  placeholder="Enter your Username" onChange={this.handleInputChange}/>
                    <input type="text" name="credito" id="credito"  placeholder="Inserisci carta di credito" onChange={this.handleInputChange}/>

                    <button className="btn btn-success" type="submit">
                            MODIFICA
                    </button>
                    </form>

                    </div>
                    
                    </>
                }
            </div>
        );
        }
        else{
            return(
                <div>
                <h1>Non sei loggato, devi registrarti</h1>
                </div>
            );
        }
    }
        
    
}
export default Profilo;
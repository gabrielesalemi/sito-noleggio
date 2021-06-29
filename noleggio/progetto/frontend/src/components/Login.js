import React, {Component} from "react";

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import $ from 'jquery';

import UserServiceApi from '../api/UserServiceApi.js';

class Login extends Component {


    componentDidMount(){

        fetch('./regioni_province_comuni.json').then(response => {
            console.log(`Status: ${response.status} ${response.statusText}`);
            console.log(`retrieved file: ${response.url}`);
            console.log(`type: ${response.headers.get('Content-Type')}`);
            return response.json(); // questa è una **Promise** di un oggetto json
        }).then(jsondata => {
            localStorage.setItem('regionData', JSON.stringify(jsondata));
        }).catch(error => {
            console.log(error.message);
        });


        $(document).ready(function(){
             $('.login-info-box').fadeOut();
             $('.login-show').addClass('show-log-panel');
         
         
         
         $('input[type="radio"]').on('change',function() {
            
         
             if($('#log-reg-show').is(':checked')) {
                 $('.register-info-box').fadeIn();
                 $('.login-info-box').fadeOut();
                 
                 $('.white-panel').removeClass('right-log');
                 
                 $('.login-show').addClass('show-log-panel');
                 $('.register-show').removeClass('show-log-panel');
             }
             if($('#log-login-show').is(':checked')) {
                 $('.register-info-box').fadeOut(); 
                 $('.login-info-box').fadeIn();
                 
                 $('.white-panel').addClass('right-log');
                 $('.register-show').addClass('show-log-panel');
                 $('.login-show').removeClass('show-log-panel');
                 
            }
        });

        const db = JSON.parse(localStorage.getItem('regionData'));

        const weakPass = new RegExp("^((?=.*[a-z]).{8,}|(?=.*[a-z])(?=.*[A-Z]).{8,})$");
        const mediumPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$");
        const strongPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$");

        let province = null;

      

        $('#repass').change(function(ev) {
            if ($(this).val() != $('#pass').val()) {
                $(this).val('').attr('placeholder', 'Password non coincidenti!');
            }
        });

        $('#pass').on('input', function(ev) {
            $(this).removeClass(['weak', 'medium', 'strong']);

            if (strongPass.test($(this).val()))
                $(this).addClass('strong');
            else if (mediumPass.test($(this).val()))
                $(this).addClass('medium');
            else $(this).addClass('weak');
        });

        $('#region').change(function(ev) {
            // rimozione dei precedenti elementi del menu Provincia e Comune

            $('#state').html('<option value="-1" selected></option>');
            $('#town').html('<option value="-1" selected></option>');

            if ($(this).val() != '-1') {
                province = db.regioni[Number.parseInt($(this).val())].province;

                for (let provincia of province) {
                    $(document.createElement('option')).
                    val(provincia.code).
                    text(provincia.nome).
                    appendTo('#state');
                }

            }
        });

        $('#state').change(function(ev) {
            // rimozione dei precedenti elementi del menu Comune

            $('#town').html('<option value="-1" selected></option>');

            if ($(this).val() != '-1') {

                for (let provincia of province) {
                    if (provincia.code == $('#state').val()) {
                        for (let comune of provincia.comuni) {

                            $(document.createElement('option')).
                            val(comune.cap).
                            text(comune.nome).
                            appendTo('#town');
                        }
                        break; // non dobbiamo cercare oltre
                    }
                }
            }
        });

     });
}



constructor(props) {

    super(props);
    this.state = {
        nome:'',
        cognome:'',
        username: '',
        password: '',
        data: '',
        email: '',
        region: '',
        state: '',
        town:'',
        codicef:'',
        codicec:''
        };
}

handleInputChange = (e) => {

    this.setState({

        [e.target.name]: e.target.value,
    });
}



handleSubmit = (e) => {
      // login button handler
      e.preventDefault();
      const user = {
        username: this.state.username, 
        password: this.state.password
    }
      // publish login details to backend
      UserServiceApi.loginUser(user).then(res => {
        UserServiceApi.registerSuccessfulLogin(res.data[0].username);
        alert("login avvenuto");
        window.location.href = `/`;
    }).catch((error) => {
        alert("username o password errati");
    });

}

handleSubmitReg = (e) => {
    e.preventDefault();
    const user = {
        nome: this.state.nome,
        cognome: this.state.cognome,
        username: this.state.username, 
        password: this.state.password,
        data: this.state.data,
        email: this.state.email,
        region: this.state.region,
        state: this.state.state,
        town:this.state.town,
        codicef: this.state.codicef,
        codicec: this.state.codicec
    }
    UserServiceApi.createNewUser(user).then(res => {
        alert("account creato con successo");
        window.location.href = `./`;
    }).catch((error) => {
        alert("errore nella registrazione");
    });
   
}
      
    render(){
         return (
            <div class="login-reg-panel">
                 <div class="login-info-box">
                     <h2>Hai un account</h2>
                     <p>Accedi per noleggiare veicoli</p>
                     <label id="label-register" for="log-reg-show">Login</label>
                     <input type="radio" name="active-log-panel" id="log-reg-show" value="log-reg-show" />
                 </div>
                             
                 <div class="register-info-box">
                     <h2>Non hai un account?</h2>
                     <p>Registrati per effettuare prenotazioni di veicoli su misura per te!</p>
                     <label id="label-login" for="log-login-show">Registrati</label>
                     <input type="radio" name="active-log-panel" value="log-login-show" id="log-login-show" />
                 </div>
                 <div class="white-panel">
                     <div class="login-show">
                     <h2>LOGIN</h2>
                     <form onSubmit={this.handleSubmit}>
                        <input
                            name="username"
                            type="text"
                            
                            onChange={this.handleInputChange}
                        />
                        <input
                                    name="password"
                                    type="password"
                        
                                    onChange={this.handleInputChange}
                         />                       
                        <button className="btn btn-success" type="submit">
                            LOGIN
                        </button>                     
                    </form>

                     </div>
                     <div class="register-show">
                     <h2>REGISTRATI</h2>
                     <form onSubmit={this.handleSubmitReg}>
                     <input type="text"  name="nome" id="nome"  placeholder="Nome" onChange={this.handleInputChange}/>
                     <input type="text"  name="cognome" id="nome"  placeholder="Cogome" onChange={this.handleInputChange}/>

                     <input type="password" name="password" id="pass" placeholder="Password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$" onChange={this.handleInputChange} required/>
                     <input type="password" name = "repass" id="repass" placeholder="Conferma Password" onChange={this.handleInputChange}/>
                     <label class="mandatory">Nato a:</label>

                     <label class="mandatory" for="region">Regione *</label>
                        <select id="region" name="region" onChange={this.handleInputChange} required>
                            <option value="-1" selected></option>
                            <option value="0">Abruzzo</option>
                            <option value="1">Basilicata</option>
                            <option value="2">Calabria</option>
                            <option value="3">Campania</option>
                            <option value="4">Emilia-Romagna</option>
                            <option value="5">Friuli-Venezia Giulia</option>
                            <option value="6">Lazio</option>
                            <option value="7">Liguria</option>
                            <option value="8">Lombardia</option>
                            <option value="9">Marche</option>
                            <option value="10">Molise</option>
                            <option value="11">Piemonte</option>
                            <option value="12">Puglia</option>
                            <option value="13">Sardegna</option>
                            <option value="14">Sicilia</option>
                            <option value="15">Toscana</option>
                            <option value="16">Trentino-Alto Adige</option>
                            <option value="17">Umbria</option>
                            <option value="18">Valle d'Aosta</option>
                            <option value="19">Veneto</option>
                        </select>

                            <label class="mandatory" for="state">Provincia *</label>
                            <select id="state" name="state" onChange={this.handleInputChange} required>
                                <option value="-1" selected></option>
                            </select>


                            <label class="mandatory" for="town">Comune *</label>
                            <select id="town" name="town" onChange={this.handleInputChange} required>
                                <option value="-1" selected></option>
                            </select>



                    <h7>Data di Nascita:</h7>
                    <input type="date"  name="data" id="data"  placeholder="Data Nascita" onChange={this.handleInputChange}/>
                    <input type="text" name="email" id="email"  placeholder="Inserisci Email" onChange={this.handleInputChange}/>
                    <input type="text" name="username" id="username"  placeholder="Inserisci Username" onChange={this.handleInputChange}/>
                    <input type="text" name="telefono" id="telefono"  placeholder="Inserisci numero telefono"/>

                    <input type="text"  name="codicef" id="data"  placeholder="Codice fiscale" onChange={this.handleInputChange}/>
                    <input type="text" name="codicec" id="username"  placeholder="Codice Carta di credito" onChange={this.handleInputChange}/>

                    <button className="btn btn-success" type="submit">
                            REGISTRATI
                        </button>                     
                 </form>
                </div>
             </div>
             
         </div>

           
     )
    }

}

export default Login;

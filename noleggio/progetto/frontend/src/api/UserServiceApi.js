import axios from 'axios';
import Cookie from "universal-cookie";

const api_url = process.env.server_url || "http://localhost:9000";

const cookies = new Cookie();
const tipo = "";

class UserServiceApi {

    constructor(){
        this.state={
            tipo:''
        };
    }
    
    createNewUser(user) {
        return axios.post(`${api_url}/registrazione`, user);
    }

    loginUser(creds) {
        return axios.post(`${api_url}/login`, creds);
    }

    updateUser(creds) {
        return axios.post(`${api_url}/updateutente`, creds);
    }

    registerSuccessfulLogin(token) {
        const cookies = new Cookie();
        const tipo = "";

        localStorage.setItem(cookies, token);

       

        this.setupAxiosInterceptors(token);
    }

    prenotazione(creds){
        return axios.post(`${api_url}/prenotazione`, creds);
    }

    updatePrenotazione(creds){
        return axios.post(`${api_url}/updateprenotazione`, creds);
        
    }

    calcolotariffa(creds){
        return axios.post(`${api_url}/calcolotariffa`, creds);
    }

    getLoggedInUserID() {        
        let token = localStorage.getItem(cookies);
        if (token === null) return '';
        else return token;
    }



    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }

    isUserLoggedIn() {
        let user = localStorage.getItem(cookies);
        if(user == null){
            return false;
        }
        else
            return true;
    }

    typeofUser(){
        axios.get(`${api_url}/tipo`,{
            params: {
                username : localStorage.getItem(cookies)
            }
        }).then(res => {
            localStorage.setItem(tipo, res.data);
        });    

        return localStorage.getItem(tipo);
    }

    logout() {
        localStorage.removeItem(cookies);
        localStorage.removeItem(tipo);
        window.location.href = `/`;
        window.alert("Arrivederci!");
    }
}

export default new UserServiceApi();

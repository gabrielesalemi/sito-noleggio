import axios from 'axios';
import Cookie from "universal-cookie";

const api_url = process.env.server_url || "http://localhost:9000/admin";



class AdminServiceApi {

    
    updatePrenotazione(data) {
        return axios.post(`${api_url}/updateprenotazione`, data);
    }

  
}

export default new AdminServiceApi();

import axios from 'axios';

const api_url = process.env.server_url || "http://localhost:9000/autista";


class AutistaServiceApi {

    updatePrenotazione(user) {
        return axios.post(`${api_url}/updateprenotazione`, user);
    }

    deletePrenotazione(user) {
        return axios.post(`${api_url}/deleteprenotazione`, user);
    }


    
}

export default new AutistaServiceApi();

import axios from 'axios';

const api_url = process.env.server_url || "http://localhost:9000/addetto";


class AddettoServiceApi {

    
    updatePrenotazione(user) {
        return axios.post(`${api_url}/updateprenotazione`, user);
    }

}

export default new AddettoServiceApi();

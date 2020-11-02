import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8081/api/auth';

class AuthService {

    login (user){
        return axios.post(USER_API_BASE_URL+"/signin",user)
    }

    signup (user){
        return axios.post(USER_API_BASE_URL + "/signup",user)
    }

}

export default new AuthService();

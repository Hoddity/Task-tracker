import axios from "axios";

const baseAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    
})

const account = {
    baseURL: '/accauts',
    async login(username, password) {
        const request = await baseAPI.post(this.baseURL + '/login', {
            username,
            password
        });

        if (request.data.Token) {
            return request.data.Token
        }
        return request.statusText
    },
    register() {

    }
}

const command = {
    get() {
        baseAPI.post()
    },
    add() {

    }
}

const api = {
    account, 
    command
}


export default api;
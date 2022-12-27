import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Content: 'application/json'
    }
})

  export default http;
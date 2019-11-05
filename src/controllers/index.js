import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost/palmeral/palmeral_backend/',
    headers: {
        "Content-Type": "application/json"
    }
})
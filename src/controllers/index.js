import axios from 'axios';

export default axios.create({
    baseURL: 'http://34.70.125.18/PalmeralBackend/',
    headers: {
        "Content-Type": "application/json"
    }
})
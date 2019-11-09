import axios from 'axios';

export default axios.create({
    baseURL: 'https://tiendashidori.xyz/PalmeralBackend/',
    headers: {
        "Content-Type": "application/json"
    }
})
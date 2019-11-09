import axios from 'axios';

export default axios.create({
    baseURL: 'https://melodic-park-237401.appspot.com/',
    headers: {
        "Content-Type": "application/json"
    }
})
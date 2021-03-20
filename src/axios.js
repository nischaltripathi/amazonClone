import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-clone-app-31d82.cloudfunctions.net/api'
});

export default instance;
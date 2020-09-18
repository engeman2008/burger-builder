import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-9b6a3.firebaseio.com/'
});

export default instance;
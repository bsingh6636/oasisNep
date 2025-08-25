import axios from 'axios';

const API_URL = 'http://localhost:8080/api/services/';

const getServices = () => {
    return axios.get(API_URL);
};

const getService = (id) => {
    return axios.get(API_URL + id);
};

const serviceService = {
    getServices,
    getService,
};

export default serviceService;

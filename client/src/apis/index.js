import axios from 'axios';

export const axiosInstance = axios.create({
    headers: {
        "Content-Type" : "application/json",
        
    }
});


axiosInstance.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
}, function(error) {return Promise.reject(error)})


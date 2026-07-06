
import { axiosInstance } from ".";

const API_URL = "http://127.0.0.1:8001/api/theaters"

export const fetchTheatersByOwner = async (values) => {
    try {
        const resp = await axiosInstance.post(API_URL + '/get-all-theaters-by-owner', values);
        return resp.data;
    }catch(err) {
        console.log(err);
    }
}

export const addTheater = async (values) => {
    try {
        const resp = await axiosInstance.post(API_URL + '/add', values);
        return resp.data;
    }catch(err){
        console.log(err.message);
    }
}

export const updateTheater = async (values) => {
    try {
        const resp = await axiosInstance.put(API_URL + '/update-theater', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
};

export const deleteTheater = async (values) => {
    try {
        const resp = await axiosInstance.put(API_URL + '/delete-theater', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}

export const getAllTheaters = async() => {
    try {
        const resp = await axiosInstance.get(API_URL + '/getAllTheater');
        console.log(resp);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}
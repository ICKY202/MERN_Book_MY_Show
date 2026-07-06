import { axiosInstance } from ".";

const API_URL = "http://127.0.0.1:8001/api/shows"


export const addShow = async(values) => {
    try {
        const resp = await axiosInstance.post(API_URL + '/add-show', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
};

export const getAllShowsByTheater = async (values) => {
    try {
        const resp = await axiosInstance.post(API_URL + '/get-shows-by-theater', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}
export const updateShow = async (values) => {
    try {
        const resp = await axiosInstance.put(API_URL + '/update-show', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}

export const deleteShow = async (values) => {
    try {
        const resp = await axiosInstance.post(API_URL + '/delete-show', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}

export const getAllTheatresByMovie = async (values) => {
    try {
        const resp = await axiosInstance.post(API_URL + '/get-all-theaters-by-movie', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}

export const getShowById = async(values) => {
    try {
        const resp = await axiosInstance.post(API_URL + '/get-show-byId', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}

import { axiosInstance } from ".";



export const fetchTheatersByOwner = async (values) => {
    try {
        const resp = await axiosInstance.post('http://127.0.0.1:8001/api/theaters/get-all-theaters-by-owner', values);
        return resp.data;
    }catch(err) {
        console.log(err);
    }
}

export const addTheater = async (values) => {
    try {
        const resp = await axiosInstance.post('http://127.0.0.1:8001/api/theaters/add', values);
        return resp.data;
    }catch(err){
        console.log(err.message);
    }
}

export const updateTheater = async (values) => {
    try {
        const resp = await axiosInstance.put('http://127.0.0.1:8001/api/theaters/update-theater', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
};

export const deleteTheater = async (values) => {
    try {
        const resp = await axiosInstance.put('http://127.0.0.1:8001/api/theaters/delete-theater', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}
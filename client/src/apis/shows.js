import { axiosInstance } from ".";

export const addShow = async(values) => {
    try {
        const resp = await axiosInstance.post('http://127.0.0.1:8001/api/shows/add-show', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
};

export const getAllShowsByTheater = async (values) => {
    try {
        const resp = await axiosInstance.post('http://127.0.0.1:8001/api/shows/get-shows-by-theater', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}
export const updateShow = async (values) => {
    try {
        const resp = await axiosInstance.put('http://127.0.0.1:8001/api/shows/update-show', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}

export const deleteShow = async (values) => {
    try {
        const resp = await axiosInstance.put('http://127.0.0.1:8001/api/shows/delete-show', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}
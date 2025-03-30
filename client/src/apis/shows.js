import { axiosInstance } from ".";

export const addShow = async(values) => {
    try {
        const resp = await axiosInstance.post('/api/shows/add-show', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
};

export const getAllShowsByTheater = async (values) => {
    try {
        const resp = await axiosInstance.post('/api/shows/get-shows-by-theater', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}
export const updateShow = async (values) => {
    try {
        const resp = await axiosInstance.put('/api/shows/update-show', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}

export const deleteShow = async (values) => {
    try {
        const resp = await axiosInstance.post('/api/shows/delete-show', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}

export const getAllTheatresByMovie = async (values) => {
    try {
        const resp = await axiosInstance.post('/api/shows/get-all-theaters-by-movie', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}

export const getShowById = async(values) => {
    try {
        const resp = await axiosInstance.post('/api/shows/get-show-byId', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}
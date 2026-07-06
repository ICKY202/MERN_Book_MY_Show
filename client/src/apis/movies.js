import { axiosInstance } from "."


const API_URL = "http://127.0.0.1:8001/api/movies"

export const getMovie = async (movieId) => {
    try {
        const resp = await axiosInstance.get(`${API_URL}/get/${movieId}`);
        console.log(resp);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
};

export const getMovies = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/getAllMovies`);
        console.log(response)
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

export const addMovie = async (values) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/add-movie`, values);

        return response.data;
    }catch(err) {
        console.log(err);
    }
}

export const updateMovie = async (values) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/update-movie`, values);

        return response.data;
    }catch(err) {
        console.log(err);
    }
}

export const deleteMovie = async (values) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/delete-movie`, values);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
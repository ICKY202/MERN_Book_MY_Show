import { axiosInstance } from "."


export const getMovie = async (movieId) => {
    try {
        const resp = await axiosInstance.get(`http://127.0.0.1:8001/api/movies/get/${movieId}`);
        console.log(resp);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
};

export const getMovies = async () => {
    try {
        const response = await axiosInstance.get('http://127.0.0.1:8001/api/movies/getAllMovies');
        console.log(response)
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

export const addMovie = async (values) => {
    try {
        const response = await axiosInstance.post('http://127.0.0.1:8001/api/movies/add-movie', values);

        return response.data;
    }catch(err) {
        console.log(err);
    }
}

export const updateMovie = async (values) => {
    try {
        const response = await axiosInstance.put('http://127.0.0.1:8001/api/movies/update-movie', values);

        return response.data;
    }catch(err) {
        console.log(err);
    }
}

export const deleteMovie = async (values) => {
    try {
        const response = await axiosInstance.put('http://127.0.0.1:8001/api/movies/delete-movie', values);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
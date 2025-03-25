import { axiosInstance } from "."


export const getMovies = async () => {
    try {
        const response = await axiosInstance.get('http://127.0.0.1:8001/api/movies/getAllMovies');

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
        const response = await axiosInstance.put('http://127.0.0.1:8001/api/movies/update-Movie', values);

        return response.data;
    }catch(err) {
        console.log(err);
    }
}

export const deleteMovie = async (values) => {
    try {
        const response = await axiosInstance.delete('http://127.0.0.1:8001/api/movies/delete-movie', values);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
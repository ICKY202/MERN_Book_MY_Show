const { axiosInstance } = require(".");

export const makePayment = async (values) => {
    try {
        const resp = await axiosInstance.post('http://127.0.0.1:8001/api/bookings/make-payment', values);
        console.log(resp);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}

export const bookShow = async (values) => {
    try {   
        const resp = await axiosInstance.post('http://127.0.0.1:8001/api/bookings/book-show', values);
        return resp.data;
    }catch(err) {
        console.log(err.message);
    }
}
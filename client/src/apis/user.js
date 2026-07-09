import { axiosInstance } from "./index";

const API_URL = "http://127.0.0.1:8001/api/users"

export const registerUser = async (values) => {
  try {
    const resp = await axiosInstance.post(`/api/users/register`, values);
    return resp.data;
  } catch (err) {
    const { data } = err.response;
    return {success: false, message: data.message};
  }
};
export const readUser = async (values) => {
  try {
    const resp = await axiosInstance.post(`/api/users/login`, values);
    console.log(resp);
    return resp.data;
  } catch (err) {
    const { data } = err.response;
    return {success: false, message: data.message};
  }
};

export const getUser = async () => {
  try {
    const resp = await axiosInstance.get(`/api/users/get-current-user`)
    return resp.data;
  }catch(err) {
    console.log(err);
  }
}
export const forgotPassword = async (values) => {
  try {
    const resp = await axiosInstance.patch(`/api/users/forgot-password`, values);
    console.log(resp);
    return resp.data;
  }catch(err) {
    console.log(err);
  }
}

export const resetPassword = async (values) => {
  try {
    const resp = await axiosInstance.patch(`/api/users/reset-password`, values);
    console.log(resp);
    return resp.data;
  }catch(err) {
    console.log(err);
  }
}
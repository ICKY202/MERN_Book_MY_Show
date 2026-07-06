import { axiosInstance } from "./index";

const API_URL = "http://127.0.0.1:8001/api/users"

export const registerUser = async (values) => {
  try {
    const resp = await axiosInstance.post(`${API_URL}/register`, values);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};
export const readUser = async (values) => {
  try {
    const resp = await axiosInstance.post(`${API_URL}/login`, values);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async () => {
  try {
    const resp = await axiosInstance.get(`${API_URL}/get-current-user`)
    return resp.data;
  }catch(err) {
    console.log(err);
  }
}
export const forgotPassword = async (values) => {
  try {
    const resp = await axiosInstance.patch(`${API_URL}/forgot-password`, values);
    console.log(resp);
    return resp.data;
  }catch(err) {
    console.log(err);
  }
}

export const resetPassword = async (values) => {
  try {
    const resp = await axiosInstance.patch(`${API_URL}/reset-password`, values);
    console.log(resp);
    return resp.data;
  }catch(err) {
    console.log(err);
  }
}
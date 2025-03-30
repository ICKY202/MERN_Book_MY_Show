import { axiosInstance } from "./index";

export const registerUser = async (values) => {
  try {
    const resp = await axiosInstance.post("/api/users/register", values);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};
export const readUser = async (values) => {
  try {
    const resp = await axiosInstance.post("/api/users/login", values);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async () => {
  try {
    const resp = await axiosInstance.get('/api/users/get-current-user')
    return resp.data;
  }catch(err) {
    console.log(err);
  }
}
export const forgotPassword = async (values) => {
  try {
    const resp = await axiosInstance.patch('/api/users/forgot-password', values);
    console.log(resp);
    return resp.data;
  }catch(err) {
    console.log(err);
  }
}

export const resetPassword = async (values) => {
  try {
    const resp = await axiosInstance.patch('/api/users/reset-password', values);
    console.log(resp);
    return resp.data;
  }catch(err) {
    console.log(err);
  }
}
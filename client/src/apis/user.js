import { axiosInstance } from "./index";

export const registerUser = async (values) => {
  try {
    const resp = await axiosInstance.post("http://127.0.0.1:8001/api/users/register", values);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};
export const readUser = async (values) => {
  try {
    const resp = await axiosInstance.post("http://127.0.0.1:8001/api/users/login", values);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async () => {
  try {
    const resp = await axiosInstance.get('http://127.0.0.1:8001/api/users/get-current-user')
    return resp.data;
  }catch(err) {
    console.log(err);
  }
}

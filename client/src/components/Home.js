import { useEffect } from "react";
import { axiosInstance } from "../apis";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const resp = await axiosInstance.get('http://127.0.0.1:8001/api/users/get-current-user')

      if(!resp.data.success) {
        navigate('/login');
      }
    }
    fetchUser();
  }, [])
    
  return (
    <div><h1>Home Page</h1></div>
  );
}

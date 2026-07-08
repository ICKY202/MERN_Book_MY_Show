import { Tabs } from "antd"
import MovieList from "./MovieList"
import TheatersTable from "./TheaterTable"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { useEffect } from 'react';

export default function Admin() {
    const { id } = useParams();
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    console.log(user._id !== id);

    
    useEffect(() => {
        if(user._id !== id){
            console.log("hello");
            navigate('/');
        } 
    }, [user]);

    const items = [
        {
            key: 1,
            label: "Movies",
            children: <MovieList />
        }, 
        {
            key: 2,
            label: "Theaters",
            children: <TheatersTable />
        }
    ]
    return <><Tabs defaultActiveKey="1" items={items}></Tabs></>
}
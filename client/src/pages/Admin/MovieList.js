import { Table } from "antd"
import {useState, useEffect} from 'react';
import { getMovies } from "../../apis/movies";

export default function MovieList() {
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        try {
            const response = await getMovies();
            setMovies(response.data);
        }catch(err) {
            console.log(err);
        }
        
    };
    const tableColumns = [
        {
            title: "Poster"
        },
        {
            title: "Movie Name",
            dataIndex: "name"
        },
        {
            title: "Description",
            dataIndex: "description"
        },
        {
            title: "Duration",
            dataIndex: 'duration'
        },
        {
            title: "Genre",
            dataIndex: 'genre'
        },
        {
            title: "Language",
            dataIndex: 'language'
        },
        {
            title: "Release Date",
            dataIndex: 'releaseDate'
        },
        {
            title: "Action"
        }
    ];

    useEffect(() => {
        fetchMovies();
    }, []);
    return <>
        <Table columns={tableColumns} dataSource={movies}/>
    </>
}
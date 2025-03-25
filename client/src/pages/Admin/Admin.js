import { Tabs } from "antd"
import MovieList from "./MovieList"
import TheaterList from "./TheaterList"

export default function Admin() {
    const items = [
        {
            key: 1,
            label: "Movies",
            children: <MovieList />
        }, 
        {
            key: 2,
            label: "Theaters",
            children: <TheaterList/>
        }
    ]
    return <div>
        <Tabs defaultActiveKey="1" items={items}></Tabs>
    </div>
}
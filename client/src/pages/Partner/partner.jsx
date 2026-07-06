import { Tabs } from "antd";
import TheaterList from "./TheaterList";

export default function Partner() {
    const items = [
        {
            key: 1,
            label: "Theaters",
            children: <TheaterList />
        },
    ];
    return (
        <>
            <Tabs items={items}></Tabs>
        </>
    )
}
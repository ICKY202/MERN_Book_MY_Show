import { Row, Layout, Col} from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Profile() {


    return <Layout style={{ width: "100%" }}>
    <Row gutter={[16]} justify="center">
        <Sidebar />
        <Col span={19}>
            <Outlet />
        </Col>
    </Row>
    </Layout>
}
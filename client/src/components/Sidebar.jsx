
import { Col, Typography } from 'antd'
import { LogoutOutlined, CloseOutlined } from '@ant-design/icons';
import classes from './Sidebar.module.css';
const { Title } = Typography;
export default function Sidebar() {


    return <Col span={4} className={classes.sidebar} >
                <Col className={classes.account_header}>
                    <Title level={3}>My Account</Title>
                    <span><CloseOutlined /></span>
                </Col>
                <Col className={classes.account_items}>
                    <li>My Profile</li>
                    <li>My Orders</li>
                    <li>Stream library</li> 
                    <li>My wishlist</li>
                </Col>
                <Col className={classes.sign_out}><LogoutOutlined />Sign Out</Col>
            </Col>
}
import { Layout, Row, Flex} from "antd";
import { CloseOutlined } from "@ant-design/icons";

import classes from "./User.module.css";


export default function User() {
  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      <Row>
        <Flex vertical justify="center" className={classes.sidebar} spacing="between">
            <div className={classes.account_header}>
                <h3>My Account</h3>
                <span><CloseOutlined /></span>
            </div>
            <ul className={classes.account_items}>
                <li>My Profile</li>
                <li>My Orders</li>
                <li>Stream library</li> 
                <li>My wishlist</li>
            </ul>
            <div className={classes.sign_out}>Sign Out</div>
        </Flex>
      </Row>
    </Layout>
  );
}

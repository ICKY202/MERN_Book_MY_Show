import { Row, Form, Col, Typography, Input, Space} from "antd";

import classes from "./User.module.css";

const { Title } = Typography
export default function User() {
  return (
        <Col span={19} className={classes.user_form_layout}>
          <Row className={classes.user_profile}>
            <span style={{display: "inline-block", padding: '1rem', border: "1px solid #f2f5f9", borderRadius: "50%"}}>
              <img src="/default-pic.avif" alt="default_profile" className={classes.default_pic}/>
            </span>
            <Title>Guest</Title>
          </Row>
          <Form>
            <Col>
              <Col>
                <Title level={3}>Account Details</Title>                
                <Row gutter={[16, 16]}>
                  <Col>
                    <Form.Item
                    label="Mobile Number"
                    name="mobile_number"
                    >
                      <Input placeholder="Get tickets on whatsapp/SMS"></Input>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                    label="Email Address"
                    name="email"
                    >
                      <Input placeholder="Email"></Input>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Title level={3}>Personal Details</Title>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Form.Item label="First Name">
                      <Input placeholder="Enter first name" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Last Name">
                      <Input placeholder="Enter last name"/>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Birthday">
                      <Input type="Date"/>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Identity">
                      <Space>
                        <Input style={{width: "80px"}} value="Male"/>
                        <Input style={{width: "80px"}} value="Female"/>
                      </Space>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Married">
                      <Space>
                        <Input style={{ width: "80px"}} value="Yes"/>
                        <Input  style={{ width: "80px"}} value="No"/>
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Col>
          </Form>
        </Col>
  );
}

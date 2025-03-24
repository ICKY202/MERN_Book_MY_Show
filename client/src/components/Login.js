import { Button, Form, Input, message } from "antd";
import {Link} from 'react-router-dom';
import { readUser } from "../apis/user";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await readUser(values);
      console.log(response);
      if(response.success) {
        message.success(response.message);
        localStorage.setItem('token', response.data);
        navigate('/');
      }else {
        message.error(response.message);
      }
    }catch(err) {
      console.log(err);
    }
  }
  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Login to BookMyShow</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Email"
                htmlFor="email"
                className="d-block"
                name="email"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input id="email" type="text" placeholder="Enter your Email"></Input>
              </Form.Item>
              <Form.Item
                label="Password"
                htmlFor="password"
                className="d-block"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input id="password" type="password" placeholder="Enter your password"></Input>
              </Form.Item>
              <Form.Item className="d-block">
                <Button
                    type="primary"
                    block
                    htmlType="submit"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                    Login
                </Button>
                </Form.Item>
            </Form>
            <div>
                <p>New User? <Link to='/register'>Register Here</Link></p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}

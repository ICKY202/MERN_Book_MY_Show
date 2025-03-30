
import {Form, Input, Button, message} from "antd";
import {Link} from 'react-router-dom';
import { forgotPassword } from "../apis/user";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ForgotPassword() {
    const onFinish = async (values) => {
        console.log(values);
        try {
            const resp = await forgotPassword(values);
            if(resp.success) {
                message.success(resp.message);
                alert('OTP has been sent');
                navigate('/reset');
            }else {
                message.error(resp.message);
            }
        }catch(err) {
            console.log(err.message);
        }
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate('/');
        }
    })
    return (
        <header className="App-header">
                <main className="main-area mw-500 text-center px-3">
                    <section className="left-section">
                        <h1>Forget Password</h1>
                    </section>
                    <section className="right-section">
                        <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                label="Email"
                                htmlFor="email"
                                name="email"
                                className="d-block"
                                rules={[{ required: true, message: "Email is required" }]}
                            >
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="Enter your Email"
                                ></Input>
                            </Form.Item>


                            <Form.Item className="d-block">
                                <Button
                                    type="primary"
                                    block
                                    htmlType="submit"
                                    style={{ fontSize: "1rem", fontWeight: "600" }}
                                >
                                    SEND OTP
                                </Button>
                            </Form.Item>
                        </Form>
                        <div>
                            <p>
                                Existing User? <Link to="/login">Login Here</Link>
                            </p>
                        </div>
                    </section>
                </main>
            </header>
    );
}
import React, { useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const Admin = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Card
                style={{
                    width: "300px"
                }}
                className="login-card" title="Admin Login">
                <Form name="admin-login-form" initialValues={{ remember: true }}>
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            style={{
                                width: "100%"
                            }}
                            onClick={(e) => {
                                if (
                                    email === "admin@admin.com" && password === "admin"
                                ) {
                                    localStorage.setItem("admin", true)
                                    navigate("/advertisements")
                                } else {
                                    message.error("Invalid Credentials,Please try again")
                                }
                            }}
                            type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </div>
    );
};

export default Admin;

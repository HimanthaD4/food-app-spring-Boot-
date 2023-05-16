import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Col, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import config from "../../config";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import './Regiser.css'; // import custom stylesheet
import Loading from "../Loading"
import {useNavigate} from "react-router-dom"
import logo from "../../images/foodies.png"
import mainI from "../../images/burger.png"




const firebaseConfig = {
    apiKey: "AIzaSyCJJRi7Iah45dRo4-JdJ6zDD5RwDc1UMT4",
    authDomain: "microtech-8704a.firebaseapp.com",
    projectId: "microtech-8704a",
    storageBucket: "microtech-8704a.appspot.com",
    messagingSenderId: "370666785649",
    appId: "1:370666785649:web:f80f33001b52e457f004d0",
    measurementId: "G-CLYR3GFYBC"
  
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

const UserRegistration = () => {
    const [form] = Form.useForm();
    const [shoulLoad, setShoulLoad] = useState(false)
    const navigate = useNavigate()
    const onFinish = async (values) => {
        setShoulLoad(true)
        if (!values.profilePictureImageUrl[0]) {
            const data = {
                "username": values.username,
                "email": values.email,
                "firstName": values.firstName,
                "lastName": values.lastName,
                "profilePictureImageUrl": values.profilePictureImage,
                "address": values.address,
                "mobileNumber": values.mobileNumber
            }

            //  if (convertToBase64(values.profilePictureImageUrl)) {
            await axios.post(`${config.baseUrl}/users`, data)
                .then((value) => {
                    localStorage.setItem("uid", value.data.id)
                    localStorage.setItem("username", value.data.username)
                    navigate("/")
                })
                .catch(err => {
                    console.log("create user failed" + err)


                })
        } else {
            const storageRef = storage.ref();
            const milliseconsds = new Date().getTime()
            const imageRef = storageRef.child(`prodile_pictures/${milliseconsds}/${values.profilePictureImageUrl[0].name}.jpg`);
            await imageRef.put(values.profilePictureImageUrl[0]).then(() => {
                imageRef.getDownloadURL().then(async(url) => {
                    const data = {
                        "username": values.username,
                        "email": values.email,
                        "firstName": values.firstName,
                        "lastName": values.lastName,
                        "profilePictureImageUrl": url,
                        "address": values.address,
                        "mobileNumber": values.mobileNumber
                    }

                    //  if (convertToBase64(values.profilePictureImageUrl)) {
                    await axios.post(`${config.baseUrl}/users`, data)
                        .then((value) => {

                            localStorage.setItem("uid", value.data.id)
                            localStorage.setItem("username", value.data.username)
                            window.location.replace("/")
                        })
                        .catch(err => {
                            console.log("create user failed" + err)


                        })
                });
            });
        }
        setShoulLoad(false)
    };

   

    const customRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        return isJpgOrPng;
    };

    if(shoulLoad){
        return <Loading/>
    }

    return (
    <div>

<img src={logo}/>
        <div className="background-image">

           <img className="mmmm" src={mainI} />
    <div className="form-container" style={{ flexDirection: "column" }}>
    <h1 className="my-heading">    <img src={logo}  width="200x"  height="45px"/></h1>

        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        type: "email",
                        message: "The input is not a valid email!",
                    },
                    {
                        required: true,
                        message: "Please input your email!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: "Please input your first name!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                    {
                        required: true,
                        message: "Please input your last name!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Profile Picture"
                name="profilePictureImageUrl"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e && e.fileList;
                }}
                rules={[
                    {
                        required: true,
                        message: "Please upload your profile picture!",
                    },
                ]}
            >
                <Upload
                    customRequest={customRequest}
                    beforeUpload={beforeUpload}
                    listType="picture"
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                label="Address"
                name="address"
                rules={[
                    {
                        required: true,
                        message: "Please input your address!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mobile Number"
                name="mobileNumber"
                rules={[
                    {
                        required: true,
                        message: "Please input your mobile number!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                >
                    Register
                </Button>
            </Form.Item>
        </Form>
    </div>
</div>

</div>

    );
}
export default UserRegistration;
























    // <div
        //     style={{
        //         display: "flex",
        //         alignItems: "center",
        //         justifyContent: "center"
        //     }}

        //     className="background-image">
        //     <div className="form-container">
        //         <h1>JOIN WITH FOODIES !</h1>
        //         <Form
        //             form={form}
        //             layout="vertical"
        //             onFinish={onFinish}
        //             autoComplete="off"
        //         >
        //             <Row gutter={[16, 16]}>
        //                 <Col span={12}>
        //                     <Form.Item
        //                         label="Username"
        //                         name="username"
        //                         rules={[
        //                             {
        //                                 required: true,
        //                                 message: "Please input your username!",
        //                             },
        //                         ]}
        //                     >
        //                         <Input />
        //                     </Form.Item>
        //                 </Col>
        //                 <Col span={12}>
        //                     <Form.Item
        //                         label="Email"
        //                         name="email"
        //                         rules={[
        //                             {
        //                                 type: "email",
        //                                 message: "The input is not a valid email!",
        //                             },
        //                             {
        //                                 required: true,
        //                                 message: "Please input your email!",
        //                             },
        //                         ]}
        //                     >
        //                         <Input />
        //                     </Form.Item>
        //                 </Col>
        //                 <Col span={12}>
        //                     <Form.Item
        //                         label="First Name"
        //                         name="firstName"
        //                         rules={[
        //                             {
        //                                 required: true,
        //                                 message: "Please inputUseryour first name!",
        //                             },
        //                         ]}
        //                     >
        //                         <Input />
        //                     </Form.Item>
        //                 </Col>
        //                 <Col span={12}>
        //                     <Form.Item
        //                         label="Last Name"
        //                         name="lastName"
        //                         rules={[
        //                             {
        //                                 required: true,
        //                                 message: "Please input your last name!",
        //                             },
        //                         ]}
        //                     >
        //                         <Input />
        //                     </Form.Item>
        //                 </Col>
        //             </Row>

        //             <Row gutter={[16, 16]}>
        //                 <Col span={12}>
        //                     <Form.Item
        //                         label="Profile Picture"
        //                         name="profilePictureImageUrl"
        //                         valuePropName="fileList"
        //                         getValueFromEvent={(e) => {
        //                             if (Array.isArray(e)) {
        //                                 return e;
        //                             }
        //                             return e && e.fileList;
        //                         }}
        //                         rules={[
        //                             {
        //                                 required: true,
        //                                 message: "Please upload your profile picture!",
        //                             },
        //                         ]}
        //                     >
        //                         <Upload
        //                             customRequest={customRequest}
        //                             beforeUpload={beforeUpload}
        //                             listType="picture"
        //                             maxCount={1}
        //                         >
        //                             <Button icon={<UploadOutlined />}>Click to upload</Button>
        //                         </Upload>
        //                     </Form.Item>
        //                 </Col>
        //                 <Col span={12}>
        //                     <Form.Item
        //                         label="Address"
        //                         name="address"
        //                         rules={[
        //                             {
        //                                 required: true,
        //                                 message: "Please input your address!",
        //                             },
        //                         ]}
        //                     >
        //                         <Input />
        //                     </Form.Item>
        //                 </Col>
        //                 <Col span={12}>
        //                     <Form.Item
        //                         label="Mobile Number"
        //                         name="mobileNumber"
        //                         rules={[
        //                             {
        //                                 required: true,
        //                                 message: "Please input your mobile number!",
        //                             },
        //                         ]}
        //                     >
        //                         <Input />
        //                     </Form.Item>
        //                 </Col>
        //             </Row>

        //             <Form.Item>
        //                 <Button
        //                     style={{ width: "100%" }}
        //                     type="primary" htmlType="submit">
        //                     Register
        //                 </Button>
        //             </Form.Item>
        //         </Form>
        //     </div>
        // </div>


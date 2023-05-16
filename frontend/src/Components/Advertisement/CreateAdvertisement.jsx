import { Form, Input, Button, message, Card } from 'antd';
import { useState } from "react"
import Title from 'antd/es/typography/Title';
import axios from 'axios';
import config from '../../config';
const CreateAdvertisement = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {

            await axios.post(`${config.baseUrl}/advertisements`, values).then((v) => {
                message.success('Advertisement created successfully');
                form.resetFields();
            }).catch(err => {
                message.error('Failed to create advertisement');
            })

        } catch (error) {

        }
        setLoading(false);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
           
            <Title>Add Advertisement</Title>
            <div
                style={{
                    width: "80vw"
                }}
            >
                <Card>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Caption"
                            name="caption"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a caption',
                                },
                            ]}
                        >
                            <Input placeholder="Enter caption" />
                        </Form.Item>

                        <Form.Item
                            label="Visit Link"
                            name="visitLink"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a visit link',
                                },
                            ]}
                        >
                            <Input placeholder="Enter visit link" />
                        </Form.Item>

                        <Form.Item
                            label="Image URL"
                            name="imageUrl"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter an image URL',
                                },
                            ]}
                        >
                            <Input placeholder="Enter image URL" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Create Advertisement
                            </Button>
                        </Form.Item>
                    </Form>

                </Card>
            </div>
        </div>
    );
};
export default CreateAdvertisement  
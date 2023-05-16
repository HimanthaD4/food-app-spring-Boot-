import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Popconfirm, Modal, Input } from 'antd';
import axios from 'axios';
import config from '../../config';

const DataTable = () => {
    const [data, setData] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingKey, setEditingKey] = useState(null);
    const [captionInput, setCaptionInput] = useState('');
    const [imageLinkInput, setImageLinkInput] = useState('');
    const [visit, setVisit] = useState('');
    const [id, setId] = useState(null)

    const columns = [
        {
            title: 'Caption',
            dataIndex: 'caption',
            key: 'caption',
            render: (_, record) => (
                <Space size="middle">
                    <p
                        style={{
                            width: "100px"
                        }}
                    >{record.caption}</p>
                </Space>
            ),
        },
        {
            title: 'Image URL',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (_, record) => (
                <Space size="middle">
                    <img src={record.imageUrl}
                        style={{
                            width: "100px",
                            height: "100px"
                        }}
                    ></img>
                </Space>
            ),
        },
        {
            title: 'Visit Link',
            dataIndex: 'visitLink',
            key: 'visitLink',
            render: (_, record) => (
                <Space size="middle">
                    <p>{record.visitLink.substring(0, 100)}</p>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => { setId(record.id); handleEdit(record); }}>Edit</Button>
                    <Popconfirm title="Are you sure to delete this item?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleDelete = (key) => {
        axios.delete(`${config.baseUrl}/advertisements/${key}`).then(() => {
            window.location.reload()
        }).catch(err => {
            console.log(`error ${err}`)
        })
    };

    const handleEdit = (record) => {

        setEditingKey(record.id);
        setCaptionInput(record.caption);
        setImageLinkInput(record.imageUrl)
        setVisit(record.visitLink)
        setIsModalVisible(true);
    };

    const handleSave = async () => {

        const d =
            { caption: captionInput, imageUrl: imageLinkInput, visitLink: visit }

        await axios.put(`${config.baseUrl}/advertisements/${id}`, d).then((value) => {
            window.location.reload()
        }).catch(err => {
            console.log("set data failed " + err)
        })
        setIsModalVisible(false);
        //window.location.reload()
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    useEffect(() => {
        axios.get(`${config.baseUrl}/advertisements`).then(value => {
            setData(value.data)
        }).catch(err => {
            console.log("get advretisements failed " + err)
        })
    }, [])

    return (
        <>
            <Table
                style={{
                    width: "90vw"
                }}
                columns={columns} dataSource={data} pagination={false} />
            <Modal title="Edit Advertisements" visible={isModalVisible} onOk={handleSave} onCancel={handleCancel}>
                <Input
                    placeholder="Enter new caption"
                    value={captionInput}
                    style={{
                        marginTop: "8px"
                    }}
                    onChange={(e) => setCaptionInput(e.target.value)}
                />
                <Input
                    placeholder="Enter new image url"
                    value={imageLinkInput}
                    style={{
                        marginTop: "8px"
                    }}
                    onChange={(e) => setImageLinkInput(e.target.value)}
                />
                <Input
                    placeholder="Enter new visit link"
                    value={visit}
                    style={{
                        marginTop: "8px"
                    }}
                    onChange={(e) => setVisit(e.target.value)}
                />



            </Modal>
        </>
    );
};

export default DataTable;
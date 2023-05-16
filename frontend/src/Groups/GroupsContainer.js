import React, { useState, useEffect } from 'react';
import GroupForm from './GroupForm';
import GroupsList from './GroupsList';
import axios from 'axios';
import config from '../config';
import NavBar from '../Components/NavBar/NavBar';
import { Card, Typography, message } from 'antd';
import Loading from '../Components/Loading';
const { Title } = Typography

const GroupsContainer = () => {
    const [groups, setGroups] = useState([]);
    const [editingGroup, setEditingGroup] = useState(null);
    const [users, setUsers] = useState([])
    const [shouldLoad, setShouldLoad] = useState(false)
  
    useEffect(() => {
        setShouldLoad(true)
        axios.get(`${config.baseUrl}/users`).then(res => {
            setUsers(res.data)
            axios.get(`${config.baseUrl}/groups`).then(res => {
                setGroups(res.data)
                setShouldLoad(false)
            }).catch(err => {
                console.log(`get groups failed ${err}`)
                setShouldLoad(false)
            })
        }).catch(err => {
            console.log(`get users failed ` + err)
        })
    }, [editingGroup]);

    const handleCreateOrUpdate = async (groupData) => {
        setShouldLoad(true)
        if (groupData.id) {
            const d = {
                id: groupData.id,
                name: groupData.name,
                createdBy: localStorage.getItem("uid"),
                members: groupData.members
            }
            await axios.put(`${config.baseUrl}/groups/${groupData.id}`, d).then(async (value) => {
                await axios.get(`${config.baseUrl}/users`).then(res => {
                    setUsers(res.data)
                    axios.get(`${config.baseUrl}/groups`).then(res => {
                        setGroups(res.data)
                        setShouldLoad(false)
                    }).catch(err => {
                        console.log(`get groups failed ${err}`)
                        setShouldLoad(false)
                    })
                }).catch(err => {
                    console.log(`get users failed ` + err)
                })
                message.success("Group Updated Sucessfully")

            }).catch(err => {
                message.error(err.toString())
            })
        } else {
            const d = {
                name: groupData.name,
                createdBy: localStorage.getItem("uid"),
                members: groupData.members
            }
            await axios.post(`${config.baseUrl}/groups`, d).then((value) => {
                message.success("Group Created Sucessfully")
            }).catch(err => {
                message.error(err.toString())
            })

        }
        setShouldLoad(false)
       
        setEditingGroup(null)
    };

    const handleDelete = async (groupId) => {
        await axios.delete(`${config.baseUrl}/groups/${groupId}`).then(value => {
            message.success("Group deleted succesfully",
             onclose= ()   =>{
                window.location.reload()
             }  
            )

        }).catch(err => {
            message.error("group delte failed,try again !");
        })
    };

    const handleEdit = (group) => {
        setEditingGroup(group);
        setUsers(group.members)
        console.log("ASd")
    };

    const handleCancel = () => {
        setEditingGroup(null);
       
    };


    if (shouldLoad) {
        return <Loading />
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <NavBar />
            <Title level={1}>Create Group</Title>
            <div style={{ width: "800px" }}>
                <Card>
                    <GroupForm
                        onSubmit={handleCreateOrUpdate}
                        onCancel={editingGroup ? handleCancel : null}
                        group={editingGroup}
                        users={users}
                    />
                    <Title level={4}>Your Groups</Title>
                    <GroupsList
                        groups={groups}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </Card>
            </div>
            {/* <Modal
                visible={shouldShowUpdate}
                footer={null}
            >
                <GroupForm
                    onSubmit={handleCreateOrUpdate}
                    onCancel={editingGroup ? handleCancel : null}
                    group={editingGroup}
                    users={users}
                />
            </Modal> */}
        </div>
    );
};

export default GroupsContainer;

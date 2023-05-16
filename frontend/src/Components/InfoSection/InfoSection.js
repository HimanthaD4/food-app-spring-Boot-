import React, { useEffect, useState } from 'react';
import "./InfoSection.css";
import { Avatar } from '@mui/material';
import imageSrc from "../../images/pp1.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InfoSection = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    const id = localStorage.getItem("uid")
    // Fetch user data on mount
    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${id}`)
            .then(response => {
                setUser(response.data);
                console.log(user)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <div>
            <div className="info__container">
                <Avatar src={imageSrc} className="info__image" 
                onClick={() => {
                    navigate(`/profile/${id}`)
                }}/>
                <div className="info_content">
                    {user && <>
                        <div className="info_username"> {user.username}</div>
                        {/*<div className="info_description"> {user.email}</div>*/}
                    </>}
                </div>
            </div>
        </div>
    );
};

export default InfoSection;

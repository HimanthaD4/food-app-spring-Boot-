import React, { useState, useEffect } from 'react';
import './MainPage.css';
import Post from '../Post/Post';
import axios from "axios"
import config from '../../config';
const MainPage = () => {
    const [postArray, setPostArray] = useState([]);

    useEffect(() => {
        getPost();
    }, []);

    const getPost = () => {
        let data = [

        ];
        axios.get(`${config.baseUrl}/posts`).then((value) => {
            setPostArray(value.data)
        }).catch(err => {
            console.log("get posts failed " + err)
        })
        setPostArray(data);
    };

    return (
        <div
            style={{
                width : "100vw"
            }}
        >
            {postArray.map((item, index) => (
                <Post
                    key={item.id}
                    id={item.id}
                    userName={item.postedBy}
                    postImage={item.imageUrls[0]}
                    likes={item.likes.length}
                    content = {item.caption}
                    comments = {item.comments}
                />
            ))}
        </div>
    );
};

export default MainPage;

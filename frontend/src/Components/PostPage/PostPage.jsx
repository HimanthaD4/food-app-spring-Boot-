import React, { useState, useEffect } from 'react';
import { Card, Typography, Image, Space, Carousel, List, Avatar } from 'antd';
import { useParams } from 'react-router-dom';
import config from '../../config';
import Loading from '../Loading';
import axios from 'axios';
import RatingsContainer from '../Ratings/RatingsContainer';
const { Title, Text } = Typography;

const PostPage = ({ }) => {
    const params = useParams()
    const postId = params.id
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [isLiked, setIslLiked] = useState(false)
    const [likeId, setLikeId] = useState("")
    const [likeCount, setLikeCount] = useState(0)
    const [user, setUser] = useState(null)


    const id = localStorage.getItem("uid")
    const handleLike = () => {
        if (!isLiked) {
            const data = {
                id: id,
                "likedBy": id,
                "likedTo": postId
            }
            axios.post(`${config.baseUrl}/like`,
                data
            ).then((value) => {
                setIslLiked(true)
            }).catch(err => {
                console.log("add like failed " + err)
            })
        }
    }

    const handleRemoveLiked = () => {
        if (isLiked) {
            axios.delete(`${config.baseUrl}/like/${likeId}`).then((value) => {
                setIsLikedFromDb();
            }).catch(err => {
                console.log(`remove liked fialed ${err}`)
            })
        }
    }

    const setIsLikedFromDb = () => {
        axios.get(`${config.baseUrl}/like/byLikedByAndLikedTo/${id}/${postId}`).then(value => {
            if (value.status !== 404) {
                setLikeId(value.data.id)
                setIslLiked(true)
            } else {
                setIslLiked(false)
            }
        }).catch(err => {
            console.log(`set is liked form db failed ${err}`)
        })
    }

    const setLikedCount = () => {

        axios.get(`${config.baseUrl}/like/findLikesByPostId/${postId}`).then(value => {
            setLikeCount(value.data.length)
        }).catch(err => {
            console.log(`get like count failed ${err}`)
        })
    }

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${config.baseUrl}/posts/${postId}`);
                const data = await response.json();
                setPost(data);
                console.log(post)
            } catch (error) {
                console.error('Failed to fetch post:', error);
            }
        };

        const fetchUser = async () => {
            await axios.get(`http://localhost:8080/api/users/${post.postedBy}`)
                .then(response => {
                    setUser(response.data)
                    axios.get(`${config.baseUrl}/comments`).then(value => {
                        setComments(value.data)
                    })
                })
                .catch(error => {
                    console.log(error);
                });
        }

        fetchPost();
        fetchUser();
    }, []); 

    return (post && user) ? (
        <div
            style={{
                width: "100vw",
            }}
        >
            <Card>
                <Title level={3}>{post.caption}</Title>
                <Space direction="vertical">
                    <Title level={2}>Posted by: {user.username}</Title>

                    {post.imageUrls.map((url, index) => (
                        <div key={index}>
                            <Image width={"100%"} src={url} />
                        </div>
                    ))}

                </Space>

            </Card>
            <div style={{
                width: "100%"
            }}>
                <Card
                    style={{
                        width: "100%"
                        , display: "flex",
                        justifyContent: "space-around"
                    }}
                >
                </Card>
            </div>
            <RatingsContainer postId={postId} ratings={post.ratings} />
        </div>
    ) : (
        <Loading />
    );
};

export default PostPage;

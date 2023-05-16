import React, { useState, useEffect } from 'react';
import './Post.css';
import { Button, Input, Modal, Rate } from 'antd';
import axios from "axios"
import config from '../../config';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { Avatar } from '@mui/material';

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


const Post = (props) => {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [isLiked, setIslLiked] = useState(false)
    const [likeId, setLikeId] = useState("")
    const [likeCount, setLikeCount] = useState(0)
    const [user, setUser] = useState(null)
    const [value, setValue] = useState("")
    const [visible, setVisible] = useState(false)
    const [postVisible, setPostVisible] = useState(false)
    const [rating, setRating] = useState(0);
    const [item, setItem] = useState(null)
    const [updatedPostContent, setUpdatePostContent] = useState("")
    const [updatedPostImage, setUpdatePostImage] = useState(null)
    const [ratingsModal, setRatingsModal] = useState(false)
    const [selectedComment, setSelectedComment] = useState(null)
    const [currentUserRatings, setCurrentUserRatings] = useState(0)
    const [rateId, setRateId] = useState(null)
    const handleOk = async () => {

        const data = {
            "commentedBy": selectedComment.commentedBy,
            "commentedTo": selectedComment.commentedTo,
            "comment": value
        }
        await axios.put(`${config.baseUrl}/post-comments/${selectedComment.id}`, data).then((Value) => {
            window.location.reload()
        }).catch(err => {
            console.log("update comment failed " + err)
        })
        setVisible(false)
    };

    const setCurrentUserRatinfsFromDb = () => {
        axios.get(`${config.baseUrl}/ratings`).then((value) => {
            for (let rate of value.data) {
                if (rate.ratedBy === localStorage.getItem("uid")) {
                    setCurrentUserRatings(rate.ratings)
                    setRateId(rate.id)
                    break
                }
            }
        }).catch(err => {
            console.log("get user ratings failed " + err)
        })
    }

    const menu = (
        <Menu>
            <Menu.Item key="1"
                onClick={(E) => {
                    setPostVisible(true)
                    setUpdatePostContent(props.content)
                }}
            >
                Update
            </Menu.Item>
            <Menu.Item key="2"
                onClick={(e) => {
                    axios.delete(`${config.baseUrl}/posts/${props.id}`).then((value => {
                        window.location.reload()
                    })).catch(err => {
                        console.log(`delete post failed ${err}`)
                    })
                }}
            >

                Delete
            </Menu.Item>
            <Menu.Item key="3"
                onClick={(e) => {
                    setRatingsModal(true)
                    if (rateId) {
                        setRating(currentUserRatings)
                    }
                }}
            >

                Add Ratings
            </Menu.Item>
        </Menu>
    );
    const commentMenu = (
        <Menu>
            <Menu.Item key="1"
                onClick={(e) => {
                    setVisible(true)
                    setValue(item.comment)
                    setSelectedComment(item)

                }}
            >
                Update
            </Menu.Item>
            <Menu.Item key="2"
                onClick={(e) => {
                    axios.delete(`${config.baseUrl}/post-comments/${item.id}`).then((value) => {
                        window.location.reload()
                    })

                }}
            >

                Delete
            </Menu.Item>

        </Menu>
    );


    const handleCancel = () => {
        setVisible(false)
    };
    const handlePostOk = async () => {
        if (updatedPostImage) {
            const storageRef = storage.ref();
            const milliseconsds = new Date().getTime()
            const imageRef = storageRef.child(`posts/${localStorage.getItem("uid")}/${milliseconsds}/${updatedPostImage.name}`);

            await imageRef.put(updatedPostImage).then(async () => {
                imageRef.getDownloadURL().then(async (url) => {
                    const d = {
                        "postedBy": localStorage.getItem("uid"),
                        "imageUrls": [
                            url
                        ],
                        "caption": updatedPostContent,
                        "likes": [],
                        "comments": []
                    }
                    await axios.put(`${config.baseUrl}/posts/${props.id}`, d).then((value) => {
                        window.location.reload()
                    }).catch(err => {
                        console.log(`update post failed ${err}`)
                    })
                });
            });
        }
        else {
            const d = {
                "postedBy": localStorage.getItem("uid"),
                "imageUrls": [
                    props.postImage
                ],
                "caption": updatedPostContent,
                "likes": [],
                "comments": []
            }
            await axios.put(`${config.baseUrl}/posts/${props.id}`, d).then((value) => {
                window.location.reload()
            }).catch(err => {
                console.log(`update post failed ${err}`)
            })
        }
        setPostVisible(false)

    };

    const handlePostCancel = () => {
        setPostVisible(false)
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${config.baseUrl}/post-comments`).then((value) => {

            setComments(value.data)
        }).catch(err => {
            console.log("get comments failed " + err)
        })
        axios.get(`${config.baseUrl}/users/${props.userName}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        setLikedCount()
        setCurrentUserRatinfsFromDb()
    }, [likeCount, isLiked]);
    const id = localStorage.getItem("uid")
    const handleLike = () => {
        if (!isLiked) {
            const data = {
                id: id,
                "likedBy": id,
                "likedTo": props.id
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
                setLikeCount()
                setIslLiked(false)
            }).catch(err => {
                console.log(`remove liked fialed ${err}`)
            })
        }
    }

    const setLikedCount = () => {
        const postId = props.id
        axios.get(`${config.baseUrl}/like/`).then(value => {
            var c = 0
            for (let like of value.data) {
                if (like.likedTo === props.id) {
                    c++
                }
                if (like.likedBy === localStorage.getItem("uid")) {
                    setLikeId(like.id)
                    setIslLiked(true)
                }
            }
            setLikeCount(c)
        }).catch(err => {
            console.log(`get like count failed ${err}`)
        })
    }

    return (
        <div
            className="post__container">
            {/* Header */}
            {props.userName === localStorage.getItem("uid") &&

                <div
                    style={{
                        display: "flex",
                        alignItems: "center"
                    }}
                    className="post__header">
                    <div
                        style={{ flex: 1 }}
                    >
                        {user && <div className="post__username"
                            style={{ margin: "0" }}
                        >
                            <Avatar src={user.profilePictureImageUrl} />
                            {user.username}</div>}
                    </div>


                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button type="text" icon={<MoreOutlined />} />
                    </Dropdown>
                </div>
            }
            <p>
                {props.content}
            </p>
            <div>
                <img

                    onClick={(e) => {
                        navigate(`/post/${props.id}`)
                    }}
                    src={props.postImage} width="615px" />
            </div>

            {/* Analytics */}

            {!props.fromUser && <div style={{ "margin": "16px 8px", display: "flex", alignItems: "center", }}>
                {
                    isLiked ?
                        <HeartFilled
                            size={64}
                            width={32}
                            height={32}
                            style={{ color: "red" }}
                            onClick={(e) => {
                                e.preventDefault()

                                handleRemoveLiked()
                            }}

                        />
                        :
                        <HeartOutlined
                            size={64}
                            onClick={(e) => {
                                e.preventDefault()

                                handleLike()
                            }}
                        />}
                {!props.fromUser && <div style={{ "fontWeight": "bold", "marginLeft": "20px  " }}>
                    {likeCount} likes
                </div>}

            </div>}



            {/* Comment Section */}
            <div>
                {comments.filter((comment) => {
                    return comment.commentedTo === props.id
                }).map((item, index) => (

                    item.commentedBy === localStorage.getItem("uid") ?
                        <div
                            key={index}
                            style={{
                                margin: "8px",
                                display: "flex",
                                maxWidth: "500px",
                                alignItems: "center"
                            }}
                        >
                            <div>
                                {item.comment}
                            </div>
                            <Dropdown overlay={commentMenu} trigger={['click']}>
                                <Button
                                    onClick={(e) => {
                                        setItem(item)
                                    }}
                                    type="text" icon={<MoreOutlined />} />
                            </Dropdown>

                        </div>
                        : <div className="post_comment"
                            key={index}
                        >
                            {item.comment}</div>

                ))}
                <input
                    value={comment}
                    text="text"
                    className="post__commentbox"
                    placeholder="Add a comment..."
                    onChange={(e) => {
                        setComment(e.target.value)

                    }}
                />
                <Button
                    type="primary"
                    onClick={async (e) => {
                        e.preventDefault()
                        const data = {
                            "commentedBy": id,
                            "commentedTo": props.id,
                            "comment": comment
                        }
                        await axios.post(`${config.baseUrl}/post-comments`, data).catch(err => {
                            console.log("add comment failed " + err)
                        })
                        setComment("")
                    }}>Comment</Button>
            </div>
            <Modal
                visible={visible}
                title="Update Comment"
                onOk={handleOk}
                onCancel={handleCancel}

            >
                <Input
                    value={value}
                    text="text"
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                />
            </Modal>
            {/* post model */}
            <Modal
                width={800}
                visible={postVisible}
                title="Update Post"
                onOk={handlePostOk}
                onCancel={handlePostCancel}

            >
                <Input value={updatedPostContent} onChange={(e) => {
                    setUpdatePostContent(e.target.value)
                }} />
                <div>
                    <img
                        style={{ width: "100%" }}
                        src={props.postImage} width="615px" />
                </div>
                <Input
                    type="file" placeholder='Update Image'
                    style={{ width: "100%" }}
                    onChange={(e) => {
                        setUpdatePostImage(e.target.files[0])
                    }}
                />

            </Modal>
            {/* rate model */}
            <Modal
                title="Rate The Post"
                visible={ratingsModal}
                onOk={async (e) => {
                    const data = {
                        // private String id;
                        // private String ratedBy;
                        // private String ratedTo;
                        // private int ratings;
                    }
await axios.post(``,)
                    setRatingsModal(false)
                }}
                onCancel={(e) => {
                    setRatingsModal(false)
                }}
            >
                <Rate
                    style={{ marginLeft: "20px" }}
                    value={rating}
                    onChange={(value) => setRating(value)}
                />
            </Modal>
        </div>
    );
};

export default Post;

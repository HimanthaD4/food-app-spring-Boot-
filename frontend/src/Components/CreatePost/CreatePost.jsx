import React, { useState } from 'react';
import { Card, Input, Button, message, } from 'antd';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import Loading from '../Loading';
import axios from 'axios';
import config from '../../config';
import "../CreatePost/CreatePost.css"

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

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
 
    const navigation = useNavigate()
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleImageUpload = async () => {
        setLoading(true)
        const uid = localStorage.getItem("uid")
        if (image) {
           
            const storageRef = storage.ref();
            const milliseconsds = new Date().getTime()
            const imageRef = storageRef.child(`posts/${uid}/${milliseconsds}/${image.name}`);

            await imageRef.put(image).then(() => {
                imageRef.getDownloadURL().then((url) => {
                    const d ={
                        "postedBy": uid,
                        "imageUrls": [
                            url
                        ],
                        "caption": content,
                        "likes": [],
                        "comments": []
                    }
                    axios.post(`${config.baseUrl}/posts`,d).then((val)=>{
                        navigation("/")
                    }).catch(err=>{
                        message.error("Create Post failed try again!")
                    })
                });
            });
        } else {
            const d ={
                "postedBy": uid,
                "imageUrls": [
              
                ],
                "caption": content,
                "likes": [],
                "comments": []
            }
            axios.post(`${config.baseUrl}/posts`,d).then((val)=>{
                navigation("/")
            }).catch(err=>{
                message.error("Create Post failed try again!")
            })
        }
        setLoading(false)
        setImage(null)
        setContent("")
    };


    if (loading) {
        return <Loading />
    }

    return (
        <Card className='container'  style={{ width: '500px' ,height: '175px', marginLeft: '380px' , marginTop:'10px' } } >
            <Input.TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                autoSize={{ minRows: 3, maxRows: 6 }}
                onPressEnter={handleImageUpload}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>

                <Input
                    type="file"

                    onChange={(e) => {
                        handleImageChange(e);
                    }}

                    style={{
                        margin: "0 16px"
                    }}
                />

                <Button
                    type="primary"
                    onClick={handleImageUpload}
                    loading={loading}
                    disabled={content.trim() === ''}
                >
                    Post
                </Button>
            </div>
        </Card>
    );
};
export default CreatePost;  











// import React, { useState } from 'react';
// import { Card, Input, Button, message, } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/storage';
// import Loading from '../Loading';
// import axios from 'axios';
// import config from '../../config';


// const firebaseConfig = {
//     apiKey: "AIzaSyCJJRi7Iah45dRo4-JdJ6zDD5RwDc1UMT4",
//     authDomain: "microtech-8704a.firebaseapp.com",
//     projectId: "microtech-8704a",
//     storageBucket: "microtech-8704a.appspot.com",
//     messagingSenderId: "370666785649",
//     appId: "1:370666785649:web:f80f33001b52e457f004d0",
//     measurementId: "G-CLYR3GFYBC"
// };

// firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();

// const CreatePost = () => {
//     const [content, setContent] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [image, setImage] = useState(null);
 
//     const navigation = useNavigate()
//     const handleImageChange = (e) => {
//         if (e.target.files[0]) {
//             setImage(e.target.files[0]);
//         }
//     };

//     const handleImageUpload = async () => {
//         setLoading(true)
//         const uid = localStorage.getItem("uid")
//         if (image) {
           
//             const storageRef = storage.ref();
//             const milliseconsds = new Date().getTime()
//             const imageRef = storageRef.child(`posts/${uid}/${milliseconsds}/${image.name}`);

//             await imageRef.put(image).then(() => {
//                 imageRef.getDownloadURL().then((url) => {
//                     const d ={
//                         "postedBy": uid,
//                         "imageUrls": [
//                             url
//                         ],
//                         "caption": content,
//                         "likes": [],
//                         "comments": []
//                     }
//                     axios.post(`${config.baseUrl}/posts`,d).then((val)=>{
//                         navigation("/")
//                     }).catch(err=>{
//                         message.error("Create Post failed try again!")
//                     })
//                 });
//             });
//         } else {
//             const d ={
//                 "postedBy": uid,
//                 "imageUrls": [
              
//                 ],
//                 "caption": content,
//                 "likes": [],
//                 "comments": []
//             }
//             axios.post(`${config.baseUrl}/posts`,d).then((val)=>{
//                 navigation("/")
//             }).catch(err=>{
//                 message.error("Create Post failed try again!")
//             })
//         }
//         setLoading(false)
//         setImage(null)
//         setContent("")
//     };


//     if (loading) {
//         return <Loading />
//     }

//     return (
//         <Card
//         >
//             <Input.TextArea
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="What's on your mind?"
//                 autoSize={{ minRows: 3, maxRows: 6 }}
//                 onPressEnter={handleImageUpload}
//             />
//             <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>

//                 <Input
//                     type="file"

//                     onChange={(e) => {
//                         handleImageChange(e);
//                     }}

//                     style={{
//                         margin: "0 16px"
//                     }}
//                 />

//                 <Button
//                     type="primary"
//                     onClick={handleImageUpload}
//                     loading={loading}
//                     disabled={content.trim() === ''}
//                 >
//                     Post
//                 </Button>
//             </div>
//         </Card>
//     );
// };
// export default CreatePost;  









import React, { useEffect, useState } from 'react';
import { auth, storage } from '../../config/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import '../../css/profile-img.css';

export default function ProfileImg() {
    const [userName, setUserName] = useState('');
    const [userImg, setUserImg] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        if (auth.currentUser) {
            setUserName(auth.currentUser.displayName || 'Anonymous User');
            setUserImg(auth.currentUser.photoURL || 'https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg');
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const storageRef = ref(storage, `profile-images/${auth.currentUser.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            }, 
            (error) => {
                console.error(error);
            }, 
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                await updateProfile(auth.currentUser, { photoURL: downloadURL });
                setUserImg(downloadURL);
                setUploadProgress(0); 
            }
        );
    };

    return (
        <>
            <div className="profile-img">
                <div className="image-container">
                    <img src={userImg} alt="profile-image" />
                </div>
                <p className="name">{userName}</p>
                <div className="file-input-container">
                    <label className="upload-button">
                        <span className="upload-icon">📁</span> Change Photo
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="file-input" 
                            onChange={handleFileChange} 
                        />
                    </label>
                </div>
                {uploadProgress > 0 && (
                    <div className="progress-bar">
                        <div 
                            className="progress-bar-inner" 
                            style={{ width: `${uploadProgress}%` }} 
                        ></div>
                    </div>
                )}
                
            </div>
            
        </>
    );
}

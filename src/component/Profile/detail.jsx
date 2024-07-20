import '../../css/detail.css';
import React, { useState, useEffect } from 'react';
import { writeUserData } from '../../config/firebaseUtil'; 
import { auth } from '../../config/firebaseConfig'; 
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

export default function Details(props) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [BMI, setBMI] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setEmail(user.email);
        setName(props.name)
        setAge(props.age)
        setHeight(props.height)
        setWeight(props.weight)
        setIsSubmitted(true);
      } else {
        setUserId(null);
        setEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = () => {
    if (userId) {
      writeUserData(userId, name, age, height, weight, email, '');
      setIsSubmitted(true);
      console.log('Data written to Firebase');
    } else {
      console.log('User not authenticated');
    }
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };
 
  return (
    <div className="detail">
      {isSubmitted? ( 
        <div className="submitted-details">
          <p><strong>{props.labelName}</strong> {props.name}</p>
          <p><strong>{props.labelEmail}</strong> {props.email}</p>
          <p><strong>{props.labelAge}</strong> {props.age}</p>
          <p><strong>{props.labelHeight}</strong> {props.height}</p>
          <p><strong>{props.labelWeight}</strong> {props.weight}</p>
          {props.showButton &&<button onClick={handleEdit} className="btn">Edit</button>}
        </div>
      ) : (
        <>
          <input
            placeholder={`Enter ${props.labelName}`}
            onChange={(e) => setName(e.target.value)}
            className="input-style"
            type="text"
            value={name}
          />
          <input
            type="text"
            onChange={(e) => setAge(e.target.value)}
            className="input-style"
            placeholder={`Enter ${props.labelAge}`}
            value={age}
          />
          <input
            type="text"
            onChange={(e) => setHeight(e.target.value)}
            className="input-style"
            placeholder={`Enter ${props.labelHeight}`}
            value={height}
          />
          <input
            type="text"
            onChange={(e) => setWeight(e.target.value)}
            className="input-style"
            placeholder={`Enter ${props.labelWeight}`}
            value={weight}
          />
          <button onClick={handleSubmit} className="btn">Submit</button>
        </>
      )}
    </div>
  );
}
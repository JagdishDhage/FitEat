import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar';
import ProfileImg from './profile-img';
import '../../css/profile.css';
import NutrientDetail from '../nutri-detail';
import Details from './detail';
import Footer from '../footer';
import { getDatabase, ref, get } from 'firebase/database';
import { auth } from '../../config/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [type, setType] = useState('');
  const [protein, setProtein] = useState('');
  const [calorry, setCalorry] = useState('');
  const [bmi, setBMI] = useState('');
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setEmail(user.email);
        fetchUserData(user.uid);
      } else {
        setUserId(null);
        setEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = (userId) => {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setName(userData.username);
        setAge(userData.age);
        setHeight(userData.height);
        setWeight(userData.weight);
        setIsSubmitted(true);
      } else {
        console.log('No data available');
      }
    }).catch((error) => {
      console.error('Error fetching user data:', error);
    });

    const userRef1 = ref(db, 'users/Nutrients/' + userId);
    get(userRef1).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setType(userData.type);
        setProtein(userData.Protein);
        setCalorry(userData.loss_Calorry);
        setBMI(userData.bmiResult);
        setIsSubmitted(true);
      } else {
        console.log('No data available');
      }
    }).catch((error) => {
      console.error('Error fetching user data:', error);
    });
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setAuthToken(null);
      setUserId(null);
      setEmail('');
      navigate('/');
      console.log('log-out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="prof-container">
        <div className='profile-card'>
          <ProfileImg />
          <div className='but1'>
            <button  className='dark'>
              <span className="material-symbols-outlined">dark_mode</span>Dark Mode</button>
            <button onClick={logOut} >LogOut</button>
          </div>
        </div>    
        <div>
          <div className='detail1'>
          <Details 
          labelName="Name:"
          labelEmail="Email:"
          labelAge="Age:"
          labelHeight="Height:"
          labelWeight="Weight:"
          name={name}
          email={email}
          age={age}
          height={height}
          weight={weight}
          showButton={true}
/>

        <Details
          labelName="Type:"
          labelAge="Protein:"
          labelHeight="Calorry:"
          labelWeight="BMI:"
          name={type}
          age={protein}
          height={calorry}
          weight={bmi}
          showButton={false} // set showButton to false to hide the button
        />
          </div>
          <div className="discrepction">
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
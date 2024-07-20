import React, { useState,useEffect } from 'react';
import Navbar from "../navbar";
import '../../css/bmi.css';
import '../../css/consume-food.css'; 
import Footer from '../footer';
import GenerateAnswer from '../geminiApi/api'
import { writeUserBMIData } from '../../config/firebaseUtil';
import { auth } from '../../config/firebaseConfig'; 
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
export default function BMI() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchUserData(user.uid);
        setLoading(false);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

 
  const calculateBMI = () => {
    setLoading(true)
    if (height && weight) {
      const heightMeters = height / 100;
      const bmi = weight / (heightMeters * heightMeters);
      setBmiResult(bmi.toFixed(2));
      setLoading(false)
    } else {
      setBmiResult(null);
    }
  };

  const handleSubmit = async () => {
    if (userId) {
      await writeUserBMIData(bmiResult,userId); // Use async/await for clarity
      console.log('Data written to Firebase');
    } else {
      console.log('User not authenticated');
    }
  };
  const fetchUserData = async (userId) => {
    try {
      const db = getDatabase();
      const userRef = ref(db, 'users/' + userId + '/physical');
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        setUserId(userData.BMI); // Assuming BMI is stored in the 'physical' collection
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bmi-container">
        <div className="bmi-title">Calculate BMI</div>
        <div className='cen'>
        <div className="input-group gen">
            <label>
              <p>Gender:</p>
               <select
               required
                className="gender-select border border-success"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>
          <div className="input-group">
            <input
              required
              className='border border-success'
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        
       
          <div className="input-group">
            <input
            required
            className='border border-success'
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
            required
            className='border border-success'
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>        
          
        
        <button className="calculate-button" onClick={calculateBMI}>
           Calculate BMI
        </button>
        <button className="calculate-button" onClick={handleSubmit}>
          Set BMI
        </button>
        
        
      </div>
     
      {bmiResult && (
          <p>Your BMI: {bmiResult}</p>,
          <div className="bmi-result">
            <GenerateAnswer response={bmiResult+ 'this is my bmi give suggection on it'} /> 
          </div>
        )}
        
     <Footer/>
    </>
  );
}

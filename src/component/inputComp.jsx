import '../css/consume-food.css';
import { useState, useEffect } from 'react';
import NutrientDetail from './nutri-detail';
import axios from 'axios';
import { writeUserCaloriesData } from '../config/firebaseUtil';
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function InputComp() {
  const [exerciseInputs, setExerciseInputs] = useState([{ food: '', quantity: '' }]);
  const [calories, setCalories] = useState(0);
  const [proteinResponse, setProteinResponse] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setLoading(false);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddFood = () => {
    setExerciseInputs([...exerciseInputs, { food: '', quantity: '' }]);
  };

  const handleInputChange = (index, event) => {
    const values = [...exerciseInputs];
    const { name, value } = event.target;
    values[index][name] = value;
    setExerciseInputs(values);
  };

  const generateFoodSentence = () => {
    const foodSentence = exerciseInputs
      .map((item) => `${item.quantity} ${item.food}`)
      .join(', ') + 
      '. I have done this exercise. Give me an approximate number of calories I have burned and do not give extra information. Only give numbers.';
    return foodSentence;
  };

  const calculateProtein = async () => {
    setLoading(true)
    const foodSentence = generateFoodSentence();
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD51ohSAffMvGCYq7C87QotwY5x07NU2-4', 
        {
          contents: [
            {
              parts: [
                {
                  text: foodSentence,
                },
              ],
            },
          ],
        }
      );

      const formattedResponse = parseResponse(response.data.candidates[0].content.parts[0].text);
      setCalories(formattedResponse); 
      setProteinResponse(formattedResponse); 
      setLoading(false);
    } catch (error) {
      console.error(error);
      setCalories("Error: Failed to retrieve response.");
      setProteinResponse("Error: Failed to retrieve response.");
    }
  };

  const parseResponse = (response) => {
    response = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    response = response.replace(/\*\s(.*?)(?=\n|$)/g, '<li>$1</li>');
    const sections = response.split('\n\n');
    return sections.map((section) => `${section}`).join('');
  };

  const handleSubmit = async () => {
    if (userId && calories) {
      await writeUserCaloriesData(calories,userId ); 
      setIsSubmitted(true);
      console.log('Data written to Firebase');
    } else {
      console.log('User not authenticated or calories data not available');
    }
  };

  return (
    <>
      <div className="food-container">
        {exerciseInputs.map((input, index) => (
          <div className="food" key={index}>
            <div className="wave-group">
              <input
                required
                type="text"
                className="input"
                name="food"
                value={input.food}
                onChange={(event) => handleInputChange(index, event)}
              />
              <span className="bar"></span>
              <label className="label">Exercise</label>
            </div>
            <div className="wave-group">
              <input
                required
                type="text"
                className="input"
                name="quantity"
                value={input.quantity}
                onChange={(event) => handleInputChange(index, event)}
              />
              <span className="bar"></span>
              <label className="label">Quantity</label>
            </div>
          </div>
        ))}
        <div className='button'>
        <button className="add-food-button" onClick={handleAddFood}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
            id="Add-1--Streamline-Core"
            height="18"
            width="18"
          >
            <desc>Add 1 Streamline Icon: https://streamlinehq.com</desc>
            <g
              id="add-1--expand-cross-buttons-button-more-remove-plus-add-+-mathematics-math"
            >
              <path
                id="Union"
                fill="#fff"
                fillRule="evenodd"
                d="M8 1c0 -0.552285 -0.44772 -1 -1 -1S6 0.447715 6 1v5H1c-0.552285 0 -1 0.44772 -1 1s0.447715 1 1 1h5v5c0 0.5523 0.44772 1 1 1s1 -0.4477 -1V8h5c0.5523 0 1-0.44772 1 -1s-0.4477 -1 -1 -1H8V1Z"
                clipRule="evenodd"
                strokeWidth="1"
              ></path>
            </g>
          </svg>
          Add Exercise
        </button>
        <button className="add-food-button" onClick={calculateProtein}>
          Calculate Loss Calories
        </button>
        <button className="add-food-button" onClick={handleSubmit}>
          Set As Final Loss-Calory
        </button>
        </div>
      </div>
      <div className='container'>
      {loading &&
         <div className="loader">
           <svg className='svg' viewBox="25 25 50 50">
              <circle r="20" cy="50" cx="50"></circle>
          </svg>
         </div>
      }
      </div>
      <div className='burn-calory'>
        <p>Calories: {calories}</p>
        {proteinResponse && (
          <NutrientDetail Response={proteinResponse} />
        )}
      </div>
    </>
  );
}

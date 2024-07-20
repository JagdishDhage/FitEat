import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/consume-food.css';
import NutrientDetail from './nutri-detail';
import { writeUserProteinData } from '../config/firebaseUtil';
import { auth } from '../config/firebaseConfig'; 
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const Food = ({ onCalculateProtein }) => {
    const [foodInputs, setFoodInputs] = useState([{ food: '', quantity: '' }]);
    const [loading, setLoading] = useState(true);
    const [proteinResponse, setProteinResponse] = useState(null);
    const [userId, setUserId] = useState(null);

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

    const fetchUserData = async (userId) => {
        try {
            const db = getDatabase();
            const userRef = ref(db, 'users/' + userId + '/Nutrients');
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                // Handle user data if needed
            } else {
                console.log('No data available');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleAddFood = () => {
        setFoodInputs([...foodInputs, { food: '', quantity: '' }]);
    };

    const handleInputChange = (index, event) => {
        const values = [...foodInputs];
        const { name, value } = event.target;
        values[index][name] = value;
        setFoodInputs(values);
    };

    const generateFoodSentence = () => {
        if(foodInputs==''){
            alert('enter the walid data');
        }
        const foodSentence = foodInputs
            .map((item) => `${item.quantity} ${item.food}`)
            .join(', ') + 
            '. I have consumed this in my meal, how much total protein, calories, fat, vitamins, and carbohydrates have I consumed? Please provide the information in a clear format. Do not give extra information, give only numbers of nutrients, not its benefits and all.';
        return foodSentence;
    };

    const calculateProtein = async () => {
        setLoading(true)
        const foodSentence = generateFoodSentence();
        console.log(foodSentence);
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
            setLoading(false);
            onCalculateProtein(formattedResponse); // Pass the response to the parent component
            setProteinResponse(formattedResponse);
        } catch (error) {
            console.error(error);
            onCalculateProtein("Error: Failed to retrieve response.");
            setProteinResponse("Error: Failed to retrieve response.");
        }
    };

    const parseResponse = (response) => {
        response = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        response = response.replace(/\*\s(.*?)(?=\n|$)/g, '<li>$1</li>');
        const sections = response.split('\n\n');
        return sections.map((section) => `<div class="section">${section}</div>`).join('');
    };

    function removeHTMLTags(html) {
        return html.replace(/<[^>]*>/g, '');
    }
    
    const handleSubmit = async () => {
        if (userId && proteinResponse) {
            const cleanProteinResponse = removeHTMLTags(proteinResponse);
            await writeUserProteinData(cleanProteinResponse, userId); 
            console.log('Data written to Firebase');
        } else {
            console.log('User not authenticated or protein response not available');
        }
    };

    return (
        <>
            <div className="food-container">
                {foodInputs.map((input, index) => (
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
                            <label className="label">Food</label>
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
                        <g id="add-1--expand-cross-buttons-button-more-remove-plus-add-+-mathematics-math">
                            <path
                                id="Union"
                                fill="#fff"
                                fillRule="evenodd"
                                d="M8 1c0 -0.552285 -0.44772 -1 -1 -1S6 0.447715 6 1v5H1c-0.552285 0 -1 0.44772 -1 1s0.447715 1 1 1h5v5c0 0.5523 0.44772 1 1 1s1 -0.44771 -1V8h5c0.5523 0 1 -0.44772 1 -1s-0.4477 -1 -1 -1H8V1Z"
                                clipRule="evenodd"
                                strokeWidth="1"
                            ></path>
                        </g>
                    </svg>
                    Add Food
                </button>
                <button className="add-food-button" onClick={calculateProtein}>
                    Calculate Nutrients
                </button>
                <button className="add-food-button" onClick={handleSubmit}>
                    Set Nutrients
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
            {proteinResponse && 
              <div className='nut'>
                <NutrientDetail className='nutrient1' response={proteinResponse} />
                
              </div>
            }
        </>
    );
};

export default Food;

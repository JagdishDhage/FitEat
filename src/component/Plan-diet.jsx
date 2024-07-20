import React, { useState } from 'react';
import Navbar from "./navbar";
import '../css/plandiet.css';
import '../css/consume-food.css'
import Food from "./food";
import Suggection from './suggection';
import '../css/suggection.css';
import Footer from './footer';
import GenerateAnswer from './geminiApi/api';

export default function PlanDiet() {
    const [proteinResponse, setProteinResponse] = useState(null);
    const [foodInputs, setFoodInputs] = useState([{ food: '', quantity: '' }]);
    const [loading, setLoading] = useState(false);
    const [foodSentence, setFoodSentence] = useState('');

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const list = [...foodInputs];
        list[index][name] = value;
        setFoodInputs(list);
    };

    const handleAddFood = () => {
        setFoodInputs([...foodInputs, { food: '', quantity: '' }]);
    };

    const plandiet = () => {
        const sentence = foodInputs
        .map((item) => `${item.quantity} ${item.food}`)
        .join(', ') 
        setFoodSentence(sentence);
    };

    const handleSubmit = () => {
        
    };

    return (
        <>
            <Navbar />
            {/* <div className="food-container">
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
                    <button className="add-food-button" onClick={plandiet}>
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
           {foodSentence && <div className='suggection'>
                <GenerateAnswer proteinResponse={foodSentence+'make a balence diet from this component '} />
            </div>} */}
            <h1>Content Will Be Added Soon</h1>
            <Footer />
        </>
    );
}
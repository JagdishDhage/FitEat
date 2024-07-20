import GenerateAnswer from './geminiApi/api';
import '../css/suggection.css';

export default function Suggection({ proteinResponse }) {
  let nutrient = `${proteinResponse} this is what I have consumed. Give me a diet to complete my nutrients. give responce in exact 70 word not less not more`;
  let extraNutrient = `${proteinResponse} this is what I have consumed. Give me that extra nutrient i have consume the nutrients. give responce in exact 70 word not less not more`;
  return (
    <>
      <div className="suggestion-container">                                                                                                                                              
        <img src='https://img.freepik.com/premium-photo/paneer-tikka-with-tangy-yogurtbased-dip_1169880-108915.jpg?ga=GA1.1.1405668704.1719522439&semt=ais_user'/>
       
        <h1>Complete Your Diet</h1>
        {proteinResponse && (
          <div className='suggest'>
          <GenerateAnswer response={nutrient} />
          <GenerateAnswer response={extraNutrient} />
          </div>
        )}
      </div>
    </> 
  );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NutrientDetail from '../nutri-detail';

export default function GenerateAnswer({ response }) {
  const [bmiResponse, setBmiResponse] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const apiResponse = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD51ohSAffMvGCYq7C87QotwY5x07NU2-4',
          {
            contents: [
              {
                parts: [
                  {
                    text: response,
                  },
                ],
              },
            ],
          }
        );
        const formattedResponse = parseResponse(apiResponse.data.candidates[0].content.parts[0].text);
        setBmiResponse(formattedResponse);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setBmiResponse("Error: Failed to retrieve response.");
        setLoading(false);
      }
    };

    const parseResponse = (response) => {
      response = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      response = response.replace(/\*\s(.*?)(?=\n|$)/g, '<li>$1</li>');
      const sections = response.split('\n\n');
      return sections.map((section) => `<div class="section">${section}</div>`).join('');
    };

    fetchResponse();
  }, [response]);

  return (
    <>
      <div>
        <div className="container">
          {loading && (
            <div className="loader">
              <svg className="svg" viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
              </svg>
            </div>
          )}
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <NutrientDetail response={bmiResponse} />
        )}
      </div>
    </>
  );
}
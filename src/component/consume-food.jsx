
import React, { useState } from 'react';
import Food from './food';
import Suggection from './suggection';

export default function ConsumeFood() {
  const [proteinResponse, setProteinResponse] = useState(null);

  return (
    <>
      <Food onCalculateProtein={(response) => setProteinResponse(response +" suggect me diet to complete my nutrients")} />
      {proteinResponse&&(<div className='suggection'>
        <Suggection proteinResponse={proteinResponse} />
        <Suggection proteinResponse={proteinResponse} />
      </div>)}
    </>
  );
}
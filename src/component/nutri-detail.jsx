import React, { useState } from 'react';
import '../css/nutri-detail.css';

export default function NutrientDetail({ response }) {

  return (
    <>
            <div className="response-container" dangerouslySetInnerHTML={{ __html: response }}/>
    </>
  );
}

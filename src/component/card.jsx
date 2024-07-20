import React from 'react';
import '../css/card.css';

export default function Card(props) {
    return (
        <div className="card">
            <img src={props.src} alt="Card Image" className="card-img" />
            <div className="card-content">
                <h2 className="card-title">{props.title}</h2>
                <p className="card-description">{props.description}</p>
                <button onClick={props.nav} className="card-button">{props.buttonText}</button>
            </div>
        </div>
    );
}

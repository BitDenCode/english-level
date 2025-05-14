import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartScreen.css';

const StartScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/test');
  };

  return (
    <div className="res-container">
      <div className="start-screen">
        <img
          src="/elena.png"
          alt="Welcome"
          className="start-image"
        />
        <h1>Добро пожаловать на тестирование!</h1>
        <p>Пройди тест из 59 вопросов, чтобы определить свой уровень английского языка.</p>
        <button className="start-button" onClick={handleStart}>
          Начать тест
        </button>
      </div>
    </div>  
  );
};

export default StartScreen;

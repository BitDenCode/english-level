import React from 'react';
import './EncouragementScreen.css';

interface EncouragementScreenProps {
  onContinue: () => void;
}

const EncouragementScreen: React.FC<EncouragementScreenProps> = ({ onContinue }) => {
  return (
    <div className="encouragement-screen">
      <div className="encouragement-content">
        <img
          src="./public/background.png"
          alt="Motivation"
          className="encouragement-image"
        />
        <div className="encouragement-text">
          <h2>You're doing great! 💪</h2>
          <p>Keep it up — you're halfway through!</p>
          <button onClick={onContinue} className="continue-button">Continue</button>
        </div>
      </div>
    </div>
  );
};

export default EncouragementScreen;

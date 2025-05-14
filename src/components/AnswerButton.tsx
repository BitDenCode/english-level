import React from 'react';
import './AnswerButton.css';

interface AnswerButtonProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ text, selected, onClick }) => {
  return (
    <button
      className={`answer-button ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default AnswerButton;

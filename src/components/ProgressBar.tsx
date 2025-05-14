import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  current: number; // текущий номер вопроса
  total: number;   // всего вопросов
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
    </div>
  );
};

export default ProgressBar;

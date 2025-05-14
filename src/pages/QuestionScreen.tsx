import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionScreen.css';
import AnswerButton from '../components/AnswerButton';
import ProgressBar from '../components/ProgressBar';
import questionsData from '../data/questions.json';

type Question = {
  question: string;
  options: string[];
  correctAnswers: number[];
};

const questions: Question[] = questionsData;

const QuestionScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const navigate = useNavigate();

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    setAnswers(newAnswers);

    // Переход к следующему вопросу или результату
    const isLast = currentIndex === questions.length - 1;

    if (isLast) {
      const correctCount = newAnswers.reduce<number>((acc, answer, i) => {
        const correct = questions[i].correctAnswers.includes(answer ?? -1);
        return acc + (correct ? 1 : 0);
      }, 0);

      navigate('/result', {
        state: {
          score: correctCount,
          total: questions.length,
          userAnswers: newAnswers,
          questions: questions,
        },
      });
    } else {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 200); // небольшая задержка для UX
    }
  };

  return (
    <div className="resw-container">
      <div className="question-container">
        <ProgressBar current={currentIndex + 1} total={questions.length} />

        <h2 className="question-title">{`Вопрос ${currentIndex + 1} из ${questions.length}`}</h2>
        <p>{currentQuestion.question}</p>

        <div className="options-list">
          {currentQuestion.options.map((option: string, index: number) => (
            <AnswerButton
              key={index}
              text={option}
              selected={answers[currentIndex] === index}
              onClick={() => handleOptionClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;

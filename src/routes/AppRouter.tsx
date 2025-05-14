import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResultScreen from '../pages/ResultScreen';
import QuestionScreen from '../pages/QuestionScreen';
import StartScreen from '../pages/StartScreen';

const AppRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<StartScreen />} />
    <Route path="/test" element={<QuestionScreen />} />
    <Route path="/result" element={<ResultScreen />} />
  </Routes>
);

export default AppRouter;

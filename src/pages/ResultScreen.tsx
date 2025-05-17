import React, { useEffect, useState } from "react";
import "./ResultScreen.css";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";




type Question = {
  question: string;
  options: string[];
  correctAnswers: number[]; // ✅ массив, а не одно число
};

type LocationState = {
  userAnswers: (number | null)[];
  questions: Question[];
};

const getLevel = (score: number) => {
  if (score <= 5) return "Starter (A1/A1)";
  if (score <= 10) return "Beginner (A1+) — Group (1)";
  if (score <= 19) return "Beginner (A1+) — Group (2)";
  if (score <= 28) return "Elementary (A1–A2) — Group (1)";
  if (score <= 36) return "Elementary (A2–A2+) — Group (2)";
  if (score <= 40) return "Pre-Intermediate (A2+) — Group (1)";
  if (score <= 45) return "Pre-Intermediate (A2+–B1) — Group (2)";
  if (score <= 50) return "Intermediate (B1–B1+) — Group (1)";
  if (score <= 57) return "Intermediate (B1+–B2) — Group (2)";
  return "Upper-Intermediate (B2) — Group (1)";
};

const ResultScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [score, setScore] = useState<number>(0);
  const [formValue, setFormValue] = useState("");

  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const state = location.state as LocationState | null;

    if (!state || !state.userAnswers || !state.questions) {
      navigate("/");
      return;
    }

    setUserAnswers(state.userAnswers);
    setQuestions(state.questions);

    const correctCount: number = state.userAnswers.reduce((acc: number, answer, index) => {
      const isCorrect = state.questions[index].correctAnswers.includes(answer ?? -1);
      return acc + (isCorrect ? 1 : 0);
    }, 0);

    setScore(correctCount);

  }, [location.state, navigate]);

  const level = getLevel(score);
  const levelText = `✨Поздравляю с прохождением тестирования! Вам подойдёт группа "${level}". Заполните форму ниже, скачайте PDF или сделайте скриншот экрана и отправьте результат Лене.`;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("English Language Test Results", 10, 20);
    doc.setFontSize(12);
    doc.text(`Correct answers: ${score}/${questions.length}`, 10, 30);
    doc.text(`Level: ${level}`, 10, 38);
    doc.text(`Name: ${formValue.trim()}`, 10, 46);

    let y = 60; // стартовая позиция по Y

    questions.forEach((q, index) => {
      const userAnswerIndex = userAnswers[index];
      const isCorrect = q.correctAnswers.includes(userAnswerIndex ?? -1);
      const resultMark = isCorrect ? "YES" : "NO";

      // Текст вопроса
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. Question:`, 10, y);
      y += 6;

      doc.setFont("helvetica", "normal");
      const wrappedQuestion = doc.splitTextToSize(q.question, 180);
      doc.text(wrappedQuestion, 12, y);
      y += wrappedQuestion.length * 6;

      // Ответ пользователя
      const userAnswerText = userAnswerIndex !== null ? q.options[userAnswerIndex] : "—";
      if (!isCorrect) {
        doc.setTextColor(200, 0, 0); // красный цвет
        doc.setFont("helvetica", "bold");
      } else {
        doc.setTextColor(0, 150, 0); // обычный чёрный
        doc.setFont("helvetica", "normal");
      }
      doc.text(`Your answer: ${userAnswerText}`, 12, y);
      y += 6;


      // Метка правильности
      doc.text(`Result: ${resultMark}`, 12, y);
      y += 10;

      // Новая страница при переполнении
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("english-test-result.pdf");
  };




  return (
    <div className="result-container">
      <div className="result-card">
        <img
          src="/ava.png"
          alt="Welcome"
          className="elena-image"
        />
        <h2>Ваш результат: {score}/{questions.length}</h2>
        <h3>Уровень: {level}</h3>
        <p>{levelText}</p>
        <input
          type="text"
          placeholder="Например: Lena 20.10.2020"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          autoFocus
        />
        <div className="result-buttons">
          <button onClick={handleDownloadPDF}>Скачать PDF</button>
          <button onClick={() => navigate("/")}>Пройти снова</button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Lesson = () => {
  const questions = [
    { questionText: 'What is this letter?', answerOptions: ['a', 'o', 'i', 'e'], correctAnswer: 'a' },
    { questionText: 'Which is "d"?', answerOptions: ['b', 'a', 'c', 'd'], correctAnswer: 'd' },
    // Add more questions as needed!
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (answer) => {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (answer === correctAnswer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert(`Quiz finished! You scored ${score} out of ${questions.length}`);
    }
  };

  return (
    <View>
      <Text>{questions[currentQuestion].questionText}</Text>
      {questions[currentQuestion].answerOptions.map((answerOption) => (
        <TouchableOpacity onPress={() => handleAnswerOptionClick(answerOption)} />
      ))}
    </View>
  );
};

export default Lesson;
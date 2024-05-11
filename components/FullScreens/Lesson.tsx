import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import {Audio} from 'expo-av'

import { Result, ListeningMulti } from '..';
import { lessonstyles } from '../../data';

const Lesson = (props) => {
    const { questions } = props;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [showResultModal, setShowResultModal] = useState(false);
    const [resultModalContent, setResultModalContent] = useState('');
    const [timerFrozen, setTimerFrozen] = useState(false);
    const [timeBonusEarned, setTimeBonusEarned] = useState(false);

    useEffect(() => {
        if (!timerFrozen) {
            const timer = setInterval(() => {
                setTimeLeft((prevTimeLeft) => {
                    if (prevTimeLeft === 0) {
                        return 0;
                    }
                    return prevTimeLeft - 0.1;
                });
            }, 100);
    
            return () => clearInterval(timer);
        }
    }, [currentQuestion, quizCompleted, timerFrozen]);

    useEffect(() => {
        setTimeLeft(10); // Reset timer to 10 seconds for each new question
    }, [currentQuestion]);


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft === 0) {
                    return 0;
                }
                return prevTimeLeft - 0.1;
            });
        }, 100);

        return () => clearInterval(timer);
    }, [currentQuestion, quizCompleted]);
    

    const handleAnswer = (selectedOption) => {
        const correctAnswer = questions[currentQuestion].correctAnswer;
        const isCorrect = selectedOption === correctAnswer;
        const timeBonus = timeLeft > 0 ? 25 : 0;
        let newScore = isCorrect ? 50 : 0;

        if (isCorrect) {
            newScore += timeBonus;
            setResultModalContent(`Correct! (+50)`);
            setShowResultModal(true);
            setTimerFrozen(true);
            setScore(score + newScore);
            setTimeBonusEarned(timeBonus > 0);
        } else {
            setResultModalContent(`Wrong! The correct answer is: ${correctAnswer}`);
            setShowResultModal(true);
            setTimerFrozen(true);
        }

        setShowResultModal(true);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    const handleRetest = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizCompleted(false);
    };


    const playSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: questions[currentQuestion].media } ,
          { shouldPlay: true }
        );
      } catch (error) {
        console.log('Error playing sound: ', error);
      }
    };


    const displayAnswers = questions.map((question, index) => (
        <View key={index}>
            <Text style={lessonstyles.question}>
                Question {index + 1}:
                {question.question}
            </Text>
            <Text style={lessonstyles.correctAnswer}>
                Correct Answer:
                {question.correctAnswer}
            </Text>
        </View>
    ));

    return (
        <View style={lessonstyles.container}>
            <Result
                visible={showResultModal}
                result={resultModalContent}
                onClose={() => {
                    setShowResultModal(false);
                    setTimerFrozen(false); // Clear the timer freeze
                    setTimeLeft(10);
                    setTimeBonusEarned(false);
                }}
                
            timeBonusEarned={timeBonusEarned}
            />
            {quizCompleted ? (
                <View>
                    <View style = {{height: '75%'}}>
                    <ScrollView>
                    <Text style={lessonstyles.score}>
                        Your Score: {score}
                    </Text>
                    <Text style={lessonstyles.question}>
                        Questions and Answers:
                    </Text>
                    {displayAnswers}
                    </ScrollView>
                    </View>
                    <TouchableOpacity
                    style={lessonstyles.retestButton}
                    onPress={handleRetest}>
                    <Text style={lessonstyles.buttonText}>
                        Retest
                    </Text>
                    </TouchableOpacity>
                </View>
            ) : (
        <View>
            {questions[currentQuestion].qType === 'listening-multi' && <ListeningMulti 
            questions={questions}
            currentQuestion={currentQuestion}
            timeLeft={timeLeft}
            timerFrozen={timerFrozen}
            handleAnswer={handleAnswer}
            playSound={playSound} 
            primary={props.primary}
            secondary={props.secondary}
            />}
        </View>
            )}
        </View>
    );
};

export default Lesson;

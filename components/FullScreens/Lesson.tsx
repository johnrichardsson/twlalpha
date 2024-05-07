import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import {Audio} from 'expo-av'
import { Circle } from 'react-native-progress';
import { COLORS } from '../../constants';
import { Result } from '..';

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
            <Text style={styles.question}>
                Question {index + 1}:
                {question.question}
            </Text>
            <Text style={styles.correctAnswer}>
                Correct Answer:
                {question.correctAnswer}
            </Text>
        </View>
    ));

    return (
        <View style={styles.container}>
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
                    <Text style={styles.score}>
                        Your Score: {score}
                    </Text>
                    <Text style={styles.question}>
                        Questions and Answers:
                    </Text>
                    {displayAnswers}
                    </ScrollView>
                    </View>
                    <TouchableOpacity
                    style={styles.retestButton}
                    onPress={handleRetest}>
                    <Text style={styles.buttonText}>
                        Retest
                    </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{alignItems: 'center', height: "100%"}}>
                    <Text style={styles.question}>
                        {questions[currentQuestion].question}
                    </Text>
                    <Circle
                        progress={timeLeft / 10}
                        size={30}
                        thickness={15}
                        color={timerFrozen ? COLORS.gray : props.primary} // Change color if timer is frozen
                        unfilledColor={timerFrozen ? COLORS.gray : props.secondary}
                        borderWidth={0}
                        showsText={false}
                        style={{ marginBottom: 0 }}
                    />
                    <Text style = {{marginBottom: 10}}> BONUS </Text>
                    <View style = {{width: '100%', alignItems: "center", height: 150}}>
                        <TouchableOpacity style = {{alignItems:'center', justifyContent: 'center', width: 100, height: 100, borderRadius: 25, marginBottom: 30, backgroundColor: "lightgrey"}} onPress={playSound}>
                                <Image
                                style = {{width: 64, height: 50}} 
                                source = {require('../../../twlalpha/assets/images/audio.png')}
                                />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.optionsContainer}>
                    {questions[currentQuestion].options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.option}
                            onPress={() => handleAnswer(option)}
                        >
                            <Text style={styles.buttonText}>
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    question: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    option: {
        width: '48%',
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    retestButton: {
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
    },
    timer: {
        fontSize: 11,
        fontWeight: 'bold',
        backgroundColor: 'yellow',
        paddingVertical: 11,
        marginRight: 120,
        borderRadius: 12,
    },
    correctAnswer: {
        color: 'green',
    },
});

export default Lesson;

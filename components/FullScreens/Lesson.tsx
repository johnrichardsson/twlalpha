import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Audio} from 'expo-av'
import { Circle } from 'react-native-progress';
import { COLORS } from '../../constants';

const Lesson = (props) => {
    const { questions } = props;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);

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
        if (selectedOption === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

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
            {quizCompleted ? (
                <View>
                    <Text style={styles.score}>
                        Your Score: {score}
                    </Text>
                    <Text style={styles.question}>
                        Questions and Answers:
                    </Text>
                    {displayAnswers}
                    <TouchableOpacity
                        style={styles.retestButton}
                        onPress={handleRetest}>
                        <Text style={styles.buttonText}>
                            Retest
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.question}>
                        {questions[currentQuestion].question}
                    </Text>
                    <Circle
                        progress={timeLeft / 10}
                        size={30}
                        thickness={15}
                        color= {COLORS.turkishRed}
                        unfilledColor= {COLORS.turkishRedAlt}
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

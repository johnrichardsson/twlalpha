import React, { useState, useEffect } from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Turkish1aQ } from './Questions/Turkish1aQ';
 
const Turkish1aLogic = (props) => {
    const [currentQuestion, setCurrentQuestion] =
        useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] =
        useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
 
    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                if (currentQuestion <
                    Turkish1aQ.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                    setTimeLeft(10);
                } else {
                    setQuizCompleted(true);
                }
            }
        }, 1000);
 
        return () => clearTimeout(timer);
    }, [currentQuestion, timeLeft]);
 
    const handleAnswer = (selectedOption) => {
        if (selectedOption ===
            Turkish1aQ[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
 
        if (currentQuestion <
            Turkish1aQ.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTimeLeft(10);
        } else {
            setQuizCompleted(true);
        }
    };
 
    const handleRetest = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizCompleted(false);
        setTimeLeft(10);
    };
    // Display questions and answers when the quiz is completed
    const displayAnswers =
        Turkish1aQ.map((question, index) => (
            <View key={index}>
                <Text style={styles.question}>
                    Question {index + 1}:
                    {Turkish1aQ[index].question}
                </Text>
                <Text style={styles.correctAnswer}>
                    Correct Answer:
                    {Turkish1aQ[index].correctAnswer}
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
                <View>
                    <Text style={styles.question}>
                        {Turkish1aQ[currentQuestion].question}
                    </Text>
                    <Text style={styles.timer}>
                        Time Left: {timeLeft} sec
                    </Text>
                    {Turkish1aQ[currentQuestion]
                        .options.map((option, index) => (
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    option: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
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
export default Turkish1aLogic;
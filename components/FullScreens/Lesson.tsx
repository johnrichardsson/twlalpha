import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Audio} from 'expo-av'

const Lesson = (props) => {
    const { questions } = props;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    

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
        setTimeLeft(10);
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
                <View>
                    <Text style={styles.question}>
                        {questions[currentQuestion].question}
                    </Text>
                    <Text style={styles.timer}>
                        Time Left: {timeLeft} sec
                    </Text>
                      <TouchableOpacity style = {{width: 100, height: 100, backgroundColor: "grey", alignItems: "center"}} onPress={playSound}>
                      </TouchableOpacity>
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

export default Lesson;

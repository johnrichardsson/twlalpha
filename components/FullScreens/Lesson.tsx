import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Audio } from 'expo-av';

import { Result, ListeningMulti, ListeningMatching } from '..';
import { lessonstyles } from '../../data';

const Lesson = (props) => {
    const { questions } = props;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [correctMatches, setCorrectMatches] = useState({});
    const [timeLeft, setTimeLeft] = useState(10);
    const [showResultModal, setShowResultModal] = useState(false);
    const [resultModalContent, setResultModalContent] = useState('');
    const [timerFrozen, setTimerFrozen] = useState(false);
    const [timeBonusEarned, setTimeBonusEarned] = useState(false);
    const [matchedPairs, setMatchedPairs] = useState([]); // Track matched pairs
    const [selectedOptions, setSelectedOptions] = useState({});
    const [leftSideSelected, setLeftSideSelected] = useState(null); // Track the selected left side option
    const [allMatchesCorrect, setAllMatchesCorrect] = useState(false); // Track if all matches are correct
    const [baseScore, setBaseScore] = useState(0);
    const [bonusScore, setBonusScore] = useState(0);

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
        setMatchedPairs([]); // Reset matched pairs for new question
    }, [currentQuestion]);

    useEffect(() => {
        // Check if currentQuestion is defined and has pairs property
        if (questions[currentQuestion] && questions[currentQuestion].pairs) {
            // Check if all pairs are correctly matched
            if (Object.keys(correctMatches).length === questions[currentQuestion].pairs.length) {
                setAllMatchesCorrect(true);
            }
        }
    }, [correctMatches, questions, currentQuestion]);

    const playSound = async (questionType, questions, currentQuestion, pairUri = null) => {
        try {
            const uri = questionType === 'listening-matching' && pairUri
                ? pairUri
                : questions[currentQuestion]?.media;

            if (!uri) {
                throw new Error("Invalid URI");
            }

            const { sound } = await Audio.Sound.createAsync(
                { uri },
                { shouldPlay: true }
            );
            await sound.playAsync();  // This line ensures the sound actually plays
        } catch (error) {
            console.log('Error playing sound: ', error);
        }
    };

    const handleAnswer = (isCorrect, correctAnswer = null, points = 0) => {
        const timeBonus = timeLeft > 0 ? 25 : 0;
        let calculatedBaseScore = 0;
        let calculatedBonusScore = 0;
    
        if (questions[currentQuestion].qType === 'listening-multi') {
            calculatedBaseScore = isCorrect ? 50 : 0;
            calculatedBonusScore = isCorrect ? timeBonus : 0;
        } else if (questions[currentQuestion].qType === 'listening-matching') {
            calculatedBaseScore = points;
            calculatedBonusScore = timeBonus;
        }
    
        setBaseScore(calculatedBaseScore);
        setBonusScore(calculatedBonusScore);
    
        if (isCorrect) {
            setResultModalContent(`Correct!`);
            setScore(score + calculatedBaseScore + calculatedBonusScore);
            setTimeBonusEarned(timeBonus > 0);
        } else {
            setResultModalContent(`Wrong! The correct answer is: ${correctAnswer}`);
        }
    
        setShowResultModal(true);
        setTimerFrozen(true);
    
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    const handleMatch = (selectedQuestion, selectedAnswer) => {
        const { pairs } = questions[currentQuestion];
        const matchedPair = pairs.find(pair => pair[0] === selectedQuestion);

        if (!matchedPair) {
            console.error('No matching question found for:', selectedQuestion);
            return;
        }

        if (matchedPair[1] === selectedAnswer) {
            console.log('Correct match!');
            const points = 25;
            setScore(prevScore => prevScore + points); // Increment score by 25 for each correct match
            setMatchedPairs(prevMatchedPairs => [...prevMatchedPairs, selectedQuestion]); // Add to matched pairs
            setCorrectMatches(prevCorrectMatches => ({ ...prevCorrectMatches, [selectedQuestion]: true }));
            setLeftSideSelected(null); // Reset the left side selection

            // Check if all pairs have been matched correctly
            if (matchedPairs.length + 1 === pairs.length) {
                setResultModalContent(`All matches correct! Total points: ${points * pairs.length}`);
                setShowResultModal(true);
                setTimerFrozen(true);
                handleAnswer(true, null, points * pairs.length); // Call handleAnswer when all matches are correct
            }
        } else {
            console.log('Incorrect match!');
            setResultModalContent(`Incorrect match! The correct answer is: ${matchedPair[1]}`);
            setShowResultModal(true);
            setTimerFrozen(true);
            setLeftSideSelected(null); // Reset the left side selection on incorrect match
            handleAnswer(false, matchedPair[1]); // Call handleAnswer on incorrect match
        }
    };

    const handleMatchSelection = (soundUri, letter, side) => {
        if (!soundUri) {
            console.error("handleMatchSelection called with invalid soundUri:", soundUri);
            return;
        }

        const currentQuestionData = questions[currentQuestion];
        if (!currentQuestionData) {
            console.error("Invalid currentQuestionData:", currentQuestionData);
            return;
        }

        if (side === 'left') {
            setLeftSideSelected(soundUri);
            playSound('listening-matching', questions, currentQuestion, soundUri); // use soundUri instead of pairUri
        } else if (side === 'right' && leftSideSelected) {
            const isCorrectMatch = currentQuestionData.pairs.some(
                pair => pair[0] === leftSideSelected && pair[1] === letter
            );

            if (isCorrectMatch) {
                setCorrectMatches({ ...correctMatches, [leftSideSelected]: true });
                handleMatch(leftSideSelected, letter);
            } else {
                setResultModalContent(`Incorrect match! The correct answer is: ${currentQuestionData.pairs.find(pair => pair[0] === leftSideSelected)?.[1]}`);
                setShowResultModal(true);
                setTimerFrozen(true);
                setLeftSideSelected(null); // Reset the left side selection on incorrect match
                handleAnswer(false, currentQuestionData.pairs.find(pair => pair[0] === leftSideSelected)?.[1]);
            }
        } else {
            Alert.alert("Choose from the left side first", "Please choose an audio from the left side first.");
        }

        console.log("Selected Options:", selectedOptions);
        console.log("Correct Matches:", correctMatches);
    };

    const toggleSelectOption = (pair, option) => {
        const selected = selectedOptions[pair] === option ? null : option;
        setSelectedOptions({ ...selectedOptions, [pair]: selected });

        // Check if the question type is ListeningMatching before calling handleAnswer
        if (questions[currentQuestion].qType === 'ListeningMatching' && selected) {
            handleAnswer(option);
        }
    };

    const handleRetest = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizCompleted(false);
        setCorrectMatches({});
        setMatchedPairs([]);
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
                baseScore={baseScore}
                bonusScore={bonusScore}
            />
            {quizCompleted ? (
                <View>
                    <View style={{ height: '75%' }}>
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
                        handleAnswer={(selectedOption) => handleAnswer(selectedOption === questions[currentQuestion].correctAnswer, questions[currentQuestion].correctAnswer)}
                        playSound={(pairUri) => playSound('listening-multi', questions, currentQuestion)}
                        primary={props.primary}
                        secondary={props.secondary}
                    />}
                    {questions[currentQuestion].qType === 'listening-matching' && <ListeningMatching
                        questions={questions}
                        currentQuestion={currentQuestion}
                        timeLeft={timeLeft}
                        timerFrozen={timerFrozen}
                        handleMatch={handleMatch}
                        handleMatchSelection={handleMatchSelection}
                        toggleSelectOption={toggleSelectOption}
                        correctMatches={correctMatches}
                        leftSideSelected={leftSideSelected}
                        selectedOptions={selectedOptions}
                        playSound={(pairUri) => playSound('listening-matching', questions, currentQuestion, pairUri)}
                        primary={props.primary}
                        secondary={props.secondary}
                    />}
                </View>
            )}
        </View>
    );
};

export default Lesson;
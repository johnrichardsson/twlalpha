import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Audio } from 'expo-av';

import { Result, ListeningMulti, ListeningMatching, ListeningTyping, PictureMulti, PictureMatching, ImageTyping, ImageMulti } from '..';
import { lessonstyles } from '../../data';

const Lesson = (props) => {
    const { questions, primary, secondary } = props;

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
    const [baseScore, setBaseScore] = useState(0);
    const [bonusScore, setBonusScore] = useState(0);
    const [calculatedBaseScore, setCalculatedBaseScore] = useState(0);
    const [calculatedBonusScore, setCalculatedBonusScore] = useState(0);

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
        setBaseScore(0); // Reset base score for new question
        setCalculatedBaseScore(0); // Reset calculated base score for new question
        setCorrectMatches({}); // Reset correct matches for new question
    }, [currentQuestion]);

    const playSound = async (uri) => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri },
                { shouldPlay: true }
            );
            await sound.playAsync();  // This line ensures the sound actually plays
        } catch (error) {
            console.log('Error playing sound: ', error);
        }
    };

    const handleAnswer = (isCorrect, correctAnswer = null, points = 0, allMatchesCorrect = false) => {
        let calculatedBaseScore = points;
        let calculatedBonusScore = 0;

        if (questions[currentQuestion].qType === 'listening-multi' && timeLeft > 0) {
            calculatedBonusScore = 25;
        }
        
        if (questions[currentQuestion].qType === 'listening-typing' && timeLeft > 0) {
            calculatedBonusScore = 25;
        } 
        
        if (questions[currentQuestion].qType === 'picture-multi' && timeLeft > 0) {
            calculatedBonusScore = 25;
        }
        
        if (questions[currentQuestion].qType === 'image-multi' && timeLeft > 0) {
            calculatedBonusScore = 25;
        }

        if (questions[currentQuestion].qType === 'image-typing' && timeLeft > 0) {
            calculatedBonusScore = 25;
        } else if (allMatchesCorrect) {
            calculatedBonusScore = timeLeft > 0 ? 50 : 0;
        }

        setBaseScore(calculatedBaseScore);
        setBonusScore(calculatedBonusScore);
        setCalculatedBaseScore(calculatedBaseScore);  // Set calculated base score
        setCalculatedBonusScore(calculatedBonusScore);  // Set calculated bonus score

        if (isCorrect) {
            setResultModalContent(`Correct!`);
            setScore(prevScore => prevScore + calculatedBaseScore + calculatedBonusScore);
            setTimeBonusEarned(calculatedBonusScore > 0);
        } else {
            setResultModalContent(`Wrong! The correct answer is: ${correctAnswer}`);
            if (questions[currentQuestion].qType === 'listening-multi') {
                setCalculatedBaseScore(0);
                setCalculatedBonusScore(0);
            }
            if (questions[currentQuestion].qType === 'listening-typing') {
                setCalculatedBaseScore(0);
                setCalculatedBonusScore(0);
            }
            if (questions[currentQuestion].qType === 'picture-multi') {
                setCalculatedBaseScore(0);
                setCalculatedBonusScore(0);
            }
            if (questions[currentQuestion].qType === 'image-multi') {
                setCalculatedBaseScore(0);
                setCalculatedBonusScore(0);
            }
            if (questions[currentQuestion].qType === 'image-typing') {
                setCalculatedBaseScore(0);
                setCalculatedBonusScore(0);
            }
        }

        setShowResultModal(true);
        setTimerFrozen(true);
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
            setBaseScore(prevBaseScore => prevBaseScore + points); // Increment base score for each correct match
            setCalculatedBaseScore(prevCalculatedBaseScore => prevCalculatedBaseScore + points); // Increment calculated base score for each correct match
            setLeftSideSelected(null); // Reset the left side selection

            // Check if all pairs have been matched correctly
            if (matchedPairs.length + 1 === pairs.length) {
                setResultModalContent(`All matches correct!`);
                setShowResultModal(true);
                setTimerFrozen(true);
                handleAnswer(true, null, calculatedBaseScore, true); // Pass the correct base score
            }
        } else {
            console.log('Incorrect match!');
            setResultModalContent(`Incorrect match! The correct answer is: ${matchedPair[1]}`);
            setShowResultModal(true);
            setTimerFrozen(true);
            setLeftSideSelected(null); // Reset the left side selection on incorrect match
            handleAnswer(false, matchedPair[1], calculatedBaseScore, false);
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
            playSound(soundUri); // use soundUri instead of pairUri
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
                handleAnswer(false, currentQuestionData.pairs.find(pair => pair[0] === leftSideSelected)?.[1], calculatedBaseScore, false);
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
        if (questions[currentQuestion].qType === 'PictureMatching' && selected) {
            handleAnswer(option);
        }
    };

    const handleRetest = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizCompleted(false);
        setCorrectMatches({});
        setMatchedPairs([]);
        setBaseScore(0); // Reset the base score
        setCalculatedBaseScore(0); // Reset the calculated base score
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
                    setTimerFrozen(false);
                    setTimeLeft(10);
                    setTimeBonusEarned(false);
                    if (currentQuestion < questions.length - 1) {
                        setCurrentQuestion(prevQuestion => prevQuestion + 1);
                    } else {
                        setQuizCompleted(true);
                    }
                }}
                baseScore={baseScore}
                bonusScore={bonusScore}
                calculatedBaseScore={calculatedBaseScore}
                calculatedBonusScore={calculatedBonusScore}
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
                        handleAnswer={(selectedOption) => handleAnswer(selectedOption === questions[currentQuestion].correctAnswer, questions[currentQuestion].correctAnswer, 50)}
                        playSound={() => playSound(questions[currentQuestion].media)}
                        primary={primary}
                        secondary={secondary}
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
                        playSound={(pairUri) => playSound(pairUri)}
                        primary={primary}
                        secondary={secondary}
                    />}
                    {questions[currentQuestion].qType === 'listening-typing' && <ListeningTyping
                        questions={questions}
                        currentQuestion={currentQuestion}
                        timeLeft={timeLeft}
                        timerFrozen={timerFrozen}
                        handleAnswer={(typedAnswer) => handleAnswer(typedAnswer === questions[currentQuestion].correctAnswer, questions[currentQuestion].correctAnswer, typedAnswer === questions[currentQuestion].correctAnswer ? 50 : 0)}
                        playSound={() => playSound(questions[currentQuestion].media)}
                        primary={primary}
                        secondary={secondary}
                    />}
                    {questions[currentQuestion].qType === 'picture-multi' && <PictureMulti
                        questions={questions}
                        currentQuestion={currentQuestion}
                        timeLeft={timeLeft}
                        timerFrozen={timerFrozen}
                        handleAnswer={(isCorrect, correctAnswer, points) => handleAnswer(isCorrect, correctAnswer, points)}
                        primary={primary}
                        secondary={secondary}
                    />}
                    {questions[currentQuestion].qType === 'picture-matching' && <PictureMatching
                        questions={questions}
                        currentQuestion={currentQuestion}
                        timeLeft={timeLeft}
                        timerFrozen={timerFrozen}
                        correctMatches={correctMatches}
                        selectedOptions={selectedOptions}
                        leftSideSelected={leftSideSelected}
                        handleAnswer = {handleAnswer}
                        playSound={() => playSound(questions[currentQuestion].media)}
                        handleMatchSelection={handleMatchSelection}
                        setResultModalContent={setResultModalContent}
                        primary={primary}
                        secondary={secondary}
                    />}
                    {questions[currentQuestion].qType === 'image-multi' && <ImageMulti
                        currentQuestion={currentQuestion}
                        questions={questions[currentQuestion]}
                        options={questions[currentQuestion].options}
                        timeLeft={timeLeft}
                        timerFrozen={timerFrozen}
                        handleAnswer={(isCorrect, correctAnswer, points) => handleAnswer(isCorrect, correctAnswer, points)}
                        playSound={() => playSound(questions[currentQuestion].media)}
                        primary={primary}
                        secondary={secondary}
                    />}
                    {questions[currentQuestion].qType === 'image-typing' && <ImageTyping
                        currentQuestion={currentQuestion}
                        questions={questions}
                        timeLeft={timeLeft}
                        timerFrozen={timerFrozen}
                        handleAnswer={(isCorrect, correctAnswer, points) => handleAnswer(isCorrect, correctAnswer, points)}
                        playSound={(pairUri) => playSound(pairUri)}
                        primary={primary}
                        secondary={secondary}
                    />}
                </View>
            )}
        </View>
    );
};

export default Lesson;
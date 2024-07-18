import React, { useState, useEffect, useRef } from 'react';
import { Alert, Animated, Dimensions, View, Text, TouchableOpacity, ScrollView, SafeAreaView, findNodeHandle, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { Result, ListeningMulti, ListeningMatching, ListeningTyping, PictureMulti, PictureMatching, ImageTyping, ImageMulti, GrammarClozeTest } from '..';
import { lessonstyles } from '../../data';

const Lesson = (props) => {
    const { questions, primary, secondary } = props;

    //STATES

    //PROGRESS CHECKS AND RESULTS
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [resultModalContent, setResultModalContent] = useState('');

    //SCORING STATES
    const [baseScore, setBaseScore] = useState(0);
    const [bonusScore, setBonusScore] = useState(0);
    const [calculatedBaseScore, setCalculatedBaseScore] = useState(0);
    const [calculatedBonusScore, setCalculatedBonusScore] = useState(0);
    const [score, setScore] = useState(0);
    const [timeBonusEarned, setTimeBonusEarned] = useState(false);
    const [timerFrozen, setTimerFrozen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);

    //MATCHING
    const [correctMatches, setCorrectMatches] = useState({});
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [leftSideSelected, setLeftSideSelected] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedSide, setSelectedSide] = useState(null);
    const [shuffledLeftItems, setShuffledLeftItems] = useState([]);
    const [shuffledRightItems, setShuffledRightItems] = useState([]);

    //TYPING
    const [typedAnswer, setTypedAnswer] = useState('');

    //GRAMMAR UTILITY
    const [selectedWordDetails, setSelectedWordDetails] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [tooltipVisible, setTooltipVisible] = useState(false);
    

    //GENERAL PLACEHOLDERS
    const [shuffledOptions, setShuffledOptions] = useState([]);

    //CONSTANTS
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    //REFS

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const tooltipRef = useRef(null);
    const wordRefs = useRef([]);  // Initialize as an empty array
    const parentRef = useRef(null);

    //EFFECTS

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

    //FUNCTIONS AND CONSTANTS

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

    const pairs = questions[currentQuestion].pairs;

    //HANDLERS

    //General Catch-All Answer Handler

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

    //Matching Handlers

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

    const handleSelection = (item, side) => {
        playSound(item);
        if (!selectedItem) {
            setSelectedItem(item);
            setSelectedSide(side);
        } else if (selectedItem !== item && selectedSide !== side) {
            const matchCondition = pairs.some(pair => 
                (side === 'left' && selectedItem === pair.right && item === pair.left) ||
                (side === 'right' && selectedItem === pair.left && item === pair.right)
            );

            if (matchCondition) {
                setCorrectMatches(prev => ({ ...prev, [item]: true, [selectedItem]: true }));
                if (Object.keys(correctMatches).length + 2 === pairs.length * 2) {
                    handleAnswer(true, null, pairs.length * 25, true); // All correct
                }
            } else {
                handleAnswer(false, null, Object.keys(correctMatches).length * 25, false); // Incorrect match
            }
            setSelectedItem(null);
            setSelectedSide(null);
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

    const handleOptionPress = (option) => {
    
        let optionValue;
        if (questions[currentQuestion].qType === 'picture-multi') {
            optionValue = option.label;
        } else {
            optionValue = option;
        }

        setSelectedOptions(optionValue);

        const isCorrect = optionValue.toString().trim().toLowerCase() === questions[currentQuestion].correctAnswer.toString().trim().toLowerCase();

        handleAnswer(isCorrect, questions[currentQuestion].correctAnswer, isCorrect ? 50 : 0);
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

    //Typing Handlers

    const handleSubmit = () => {
        const isCorrect = typedAnswer.toLowerCase() === questions[currentQuestion].correctAnswer.toLowerCase();
        handleAnswer(isCorrect, questions[currentQuestion].correctAnswer, isCorrect ? 50 : 0);
        setTypedAnswer('');
    };

    //Grammar Utilities

    const showWordDetails = (word, index) => {
        setSelectedWordDetails(word);
    
        if (wordRefs.current[index]) {
            if (Platform.OS === 'web') {
                wordRefs.current[index].measure((x, y, width, height, pageX, pageY) => {
                    console.log(`Word component position (web) - pageX: ${pageX}, pageY: ${pageY}, width: ${width}, height: ${height}`);
                    console.log(`Window dimensions - width: ${windowWidth}, height: ${windowHeight}`);
    
                    let newX = x + (0.25 * width); // Center tooltip horizontally with the word
                    let newY = y + (3 * height); // Center tooltip vertically with the word
    
                    if (newX + width > windowWidth) newX = windowWidth - width;
                    if (newX < 0) newX = 0;
                    if (newY + height > windowHeight) newY = windowHeight - height;
                    if (newY < 0) newY = pageY + height + 10;
    
                    console.log(`Calculated tooltip position (web) - x: ${newX}, y: ${newY}`);
    
                    setTooltipPosition({ x: newX, y: newY });
                    setTooltipVisible(true);
                    fadeIn();
                });
            } else if (Platform.OS === 'android' || Platform.OS === 'ios') {
                const nodeHandle = findNodeHandle(parentRef.current);
                wordRefs.current[index].measureLayout(
                    nodeHandle,
                    (x, y, width, height) => {
                        console.log(`Word component position (mobile) - x: ${x}, y: ${y}, width: ${width}, height: ${height}`);
                        console.log(`Window dimensions - width: ${windowWidth}, height: ${windowHeight}`);

                        let newX = x + width / 2; 
                        let newY = y + height; 

                        if (newX + width > windowWidth) newX = windowWidth - width;
                        if (newX < 0) newX = 0;
                        if (newY + height > windowHeight) newY = windowHeight - height;
                        if (newY < 0) newY = y + height + 10;

                        console.log(`Calculated tooltip position (mobile) - x: ${newX}, y: ${newY}`);

                        setTooltipPosition({ x: newX, y: newY });
                        setTooltipVisible(true);
                        fadeIn();
                    },
                    (error) => console.log("measureLayout error: ", error)
                );
            }
        }
    };

    //Results Handler

    const handleRetest = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizCompleted(false);
        setCorrectMatches({});
        setMatchedPairs([]);
        setBaseScore(0); // Reset the base score
        setCalculatedBaseScore(0); // Reset the calculated base score
    };

    //Animations

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {
            setTooltipVisible(false);
            setSelectedWordDetails(null);
        });
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
    <SafeAreaView style={{flex: 1}} ref={parentRef}>
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
                        typedAnswer={typedAnswer}
                        setTypedAnswer={setTypedAnswer}
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
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                        handleOptionPress={handleOptionPress}
                        shuffledOptions={shuffledOptions}
                        setShuffledOptions={setShuffledOptions}
                    />}
                    {questions[currentQuestion].qType === 'picture-matching' && <PictureMatching
                        questions={questions}
                        currentQuestion={currentQuestion}
                        timeLeft={timeLeft}
                        timerFrozen={timerFrozen}
                        correctMatches={correctMatches}
                        setCorrectMatches={setCorrectMatches}
                        handleSelection={handleSelection}
                        selectedOptions={selectedOptions}
                        leftSideSelected={leftSideSelected}
                        handleAnswer = {handleAnswer}
                        playSound={() => playSound(questions[currentQuestion].media)}
                        handleMatchSelection={handleMatchSelection}
                        setResultModalContent={setResultModalContent}
                        shuffledLeftItems={shuffledLeftItems}
                        setShuffledLeftItems={setShuffledLeftItems}
                        shuffledRightItems={shuffledRightItems}
                        setShuffledRightItems={setShuffledRightItems}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        selectedSide={selectedSide}
                        setSelectedSide={setSelectedSide}
                        pairs={pairs}
                        primary={primary}
                        secondary={secondary}
                    />}
                    {questions[currentQuestion].qType === 'image-multi' && <ImageMulti
                        currentQuestion={currentQuestion}
                        questions={questions[currentQuestion]}
                        options={questions[currentQuestion].options}
                        timeLeft={timeLeft}
                        timerFrozen={timerFrozen}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                        handleAnswer={(isCorrect, correctAnswer, points) => handleAnswer(isCorrect, correctAnswer, points)}
                        handleOptionPress={handleOptionPress}
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
                        handleSubmit={handleSubmit}
                        playSound={(pairUri) => playSound(pairUri)}
                        typedAnswer={typedAnswer}
                        setTypedAnswer={setTypedAnswer}
                        primary={primary}
                        secondary={secondary}
                    />}
                    {questions[currentQuestion].type === 'grammar-cloze' && <GrammarClozeTest
                        translated={questions[currentQuestion].translated}
                        question={questions[currentQuestion].question}
                        options={questions[currentQuestion].options}
                        words={questions[currentQuestion].words}
                        correctAnswer={questions[currentQuestion].correctAnswer} // Ensure this line is added
                        handleAnswer={(isCorrect, correctAnswer) => handleAnswer(isCorrect, correctAnswer, isCorrect ? 50 : 0)}
                        showWordDetails={showWordDetails}
                        selectedWordDetails={selectedWordDetails}
                        setSelectedWordDetails={setSelectedWordDetails}
                        tooltipPosition={tooltipPosition}
                        setTooltipPosition={setTooltipPosition}
                        tooltipVisible={tooltipVisible}
                        setTooltipVisible={setTooltipVisible}
                        fadeIn = {fadeIn}
                        fadeOut = {fadeOut}
                        wordRefs = {wordRefs.current}
                        tooltipRef = {tooltipRef}
                        fadeAnim = {fadeAnim}
                    />}
                </View>
            )}
        </View>
    </SafeAreaView>
    );
};

export default Lesson;
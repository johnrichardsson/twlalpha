import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { Circle } from 'react-native-progress';

const PictureMulti = (props) => {
    const {
        currentQuestion,
        questions,
        handleAnswer,
        handleOptionPress,
        primary,
        secondary,
        timeLeft,
        timerFrozen,
        shuffledOptions,
        setShuffledOptions,
        selectedOption,
        setSelectedOptions,
    } = props;

    // Function to shuffle an array
const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

    useEffect(() => {
        // Shuffle options when the current question changes
        setShuffledOptions(shuffleArray(questions[currentQuestion].options));
    }, [currentQuestion, questions]);

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{questions[currentQuestion].question}</Text>
            <Circle
                progress={timeLeft / 10}
                size={30}
                thickness={15}
                color={timerFrozen ? COLORS.gray : primary}
                unfilledColor={timerFrozen ? COLORS.gray : secondary}
                borderWidth={0}
                showsText={false}
                style={{ marginBottom: 20 }}
            />
            <Text style={{ marginBottom: 10 }}> BONUS </Text>
            <View style={styles.optionsContainer}>
                {shuffledOptions.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.option,
                            {
                                borderColor: selectedOption === option ? primary : 'transparent',
                                borderWidth: selectedOption === option ? 2 : 0,
                                backgroundColor: 'lightgrey',
                            }
                        ]}
                        onPress={() => handleOptionPress(option)}
                    >
                        <Image
                            source={{ uri: option.image }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.label}>              </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
        textAlign: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // Adjust to space between options
        width: '90%',
    },
    option: {
        margin: 10,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%', // Ensure the options take half the width of the container
        height: 180, // Increase height to ensure image and label fit well
    },
    image: {
        width: '100%',
        height: 120, // Adjust height to ensure image is fully visible
        borderRadius: 8,
    },
    label: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
});

export default PictureMulti;

//ALL FUNCTIONS AND STATES IMPORTED!
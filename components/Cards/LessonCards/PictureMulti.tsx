import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { Circle } from 'react-native-progress';
import { lessonstyles } from '../../../data';

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
        <View style={lessonstyles.container}>
            <Text style={lessonstyles.question}>{questions[currentQuestion].question}</Text>
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
            <Text style={lessonstyles.bonusText}>BONUS</Text>
            <View style={lessonstyles.optionsContainer}>
                {shuffledOptions.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            lessonstyles.option,
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
                            style={{
                                width: '100%',
                                height: 120,
                                borderRadius: 8,
                            }}
                            resizeMode="contain"
                        />
                        <Text style={lessonstyles.label}>              </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default PictureMulti;

//STYLES UNIFIED
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Circle } from 'react-native-progress';
import { COLORS } from '../../../constants';
import { lessonstyles } from '../../../data';

const ImageMulti = ({ currentQuestion, questions, options, handleAnswer, playSound, primary, secondary, timeLeft, timerFrozen, selectedOptions, setSelectedOptions, handleOptionPress }) => {

    return (
        <View style={lessonstyles.container}>
            <Text style={lessonstyles.question}>{questions.question}</Text>
            <TouchableOpacity
                style={{ alignItems: 'center', justifyContent: 'center', width: '90%', borderRadius: 25, marginBottom: 30, backgroundColor: 'lightgrey' }}
                onPress={() => playSound(questions[currentQuestion].media)}>
                <Image
                    source={{ uri: questions.image }}
                    style={lessonstyles.imageDisplay}
                    resizeMode="contain"
                />
            </TouchableOpacity>
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
            <Text style={lessonstyles.bonusText}> BONUS </Text>
            <View style={lessonstyles.optionsContainer}>
                {questions.options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            lessonstyles.option,
                            {
                                borderColor: selectedOptions === option ? primary : 'transparent',
                                borderWidth: selectedOptions === option ? 2 : 0,
                                backgroundColor: 'lightgrey',
                            }
                        ]}
                        onPress={() => handleOptionPress(option)}
                    >
                        <Text style={lessonstyles.buttonText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default ImageMulti;

//FUNCTIONS AND STATES ALL IMPORTED!
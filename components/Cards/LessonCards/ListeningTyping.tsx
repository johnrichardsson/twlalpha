import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { lessonstyles } from '../../../data';
import { Circle } from 'react-native-progress';

const ListeningTyping = (props) => {
    const {
        currentQuestion,
        questions,
        playSound,
        handleAnswer,
        primary,
        secondary,
        typedAnswer,
        setTypedAnswer,
        timeLeft,
        timerFrozen,
    } = props;

    useEffect(() => {
        playSound(questions[currentQuestion].media);
    }, [currentQuestion]);

    return (
        <View style={lessonstyles.container}>
            <Text style={lessonstyles.question}>{questions[currentQuestion].question}</Text>
            <Circle
                progress={timeLeft / 10}
                size={30}
                thickness={15}
                color={timerFrozen ? COLORS.gray : props.primary}
                unfilledColor={timerFrozen ? COLORS.gray : props.secondary}
                borderWidth={0}
                showsText={false}
                style={{ marginBottom: 0 }}
            />
            <Text style={lessonstyles.bonusText}> BONUS </Text>
            <TouchableOpacity
                    style={ lessonstyles.audioButton }
                    onPress={() => playSound(questions[currentQuestion].media)}>
                    <Image
                        style={{ width: 64, height: 50 }}
                        source={require('../../../../twlalpha/assets/images/audio.png')}
                    />
            </TouchableOpacity>
            <TextInput
                style={lessonstyles.input}
                onChangeText={setTypedAnswer}
                value={typedAnswer}
                placeholder="Type your answer here"
            />
            <TouchableOpacity
                onPress={() => handleAnswer(typedAnswer)}
                style = {{borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: primary, height: '10%', width: '40%'}}
            >
                <Text style = {lessonstyles.submitText}>
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ListeningTyping;

//FUNCTIONS AND STATES ALL IMPORTED!
//Notes: Change to new generation method
//STYLES UNIFIED!
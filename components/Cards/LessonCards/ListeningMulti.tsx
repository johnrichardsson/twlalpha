import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Circle } from 'react-native-progress';
import { lessonstyles } from '../../../data';
import { COLORS } from '../../../constants';

const ListeningMulti = (props) => {
    const {
        currentQuestion,
        timeLeft,
        timerFrozen,
        questions,
        handleAnswer,
        playSound,
        primary,
        secondary,
    } = props;

    const question = questions[currentQuestion];

    return (
        <View style={lessonstyles.container}>
            <Text style={lessonstyles.question}>
                {question.question}
            </Text>
            <Circle
                size={30}
                thickness={15}
                borderWidth={0}
                showsText={false}
                style={{ marginBottom: 0 }}
                progress={timeLeft / 10}
                color={timerFrozen ? COLORS.gray : primary}
                unfilledColor={timerFrozen ? COLORS.gray : secondary}
            />
            <Text style={lessonstyles.bonusText}> BONUS </Text>
            <View style={{ width: '100%', alignItems: "center", height: 150 }}>
                <TouchableOpacity
                    style={lessonstyles.audioButton}
                    onPress={() => playSound(question.media)}
                >
                    <Image
                        style={{ width: 64, height: 50 }}
                        source={require('../../../../twlalpha/assets/images/audio.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={lessonstyles.optionsContainer}>
                {question.options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={lessonstyles.option}
                        onPress={() => handleAnswer(option)}
                    >
                        <Text style={lessonstyles.buttonText}>
                            {typeof option === 'string' ? option : option.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default ListeningMulti;

//STYLES UNIFIED!
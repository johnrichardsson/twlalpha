import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
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
        playSound
    } = props;

    return (
    <View style={{alignItems: 'center', height: "100%"}}>
        <Text style={lessonstyles.question}>
            {questions[currentQuestion].question}
        </Text>
        <Circle
            progress={timeLeft / 10}
            size={30}
            thickness={15}
            color={timerFrozen ? COLORS.gray : props.primary} // Change color if timer is frozen
            unfilledColor={timerFrozen ? COLORS.gray : props.secondary}
            borderWidth={0}
            showsText={false}
            style={{ marginBottom: 0 }}
        />
        <Text style = {{marginBottom: 10}}> BONUS </Text>
        <View style = {{width: '100%', alignItems: "center", height: 150}}>
            <TouchableOpacity style = {{alignItems:'center', justifyContent: 'center', width: 100, height: 100, borderRadius: 25, marginBottom: 30, backgroundColor: "lightgrey"}} onPress={playSound}>
                    <Image
                    style = {{width: 64, height: 50}} 
                    source = {require('../../../../twlalpha/assets/images/audio.png')}
                    />
            </TouchableOpacity>
        </View>
        <View style={lessonstyles.optionsContainer}>
        {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
                key={index}
                style={lessonstyles.option}
                onPress={() => handleAnswer(option)}
            >
                <Text style={lessonstyles.buttonText}>
                    {option}
                </Text>
            </TouchableOpacity>
        ))}
        </View>
    </View>
    );
};

export default ListeningMulti;
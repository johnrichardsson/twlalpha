import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Circle } from 'react-native-progress';
import { lessonstyles } from '../../../data';
import { COLORS } from '../../../constants';

const ListeningMatching = (props) => {
    const {
        currentQuestion,
        timeLeft,
        timerFrozen,
        questions,
        playSound,
        correctMatches,
        selectedOptions,
        leftSideSelected,
        handleMatchSelection,
        primary,
        secondary
    } = props;

    return (
        <View style={{ alignItems: 'center', height: '100%' }}>
            <Text style={lessonstyles.question}>
                {questions[currentQuestion].question}
            </Text>
            <Circle
                progress={timeLeft / 10}
                size={30}
                thickness={15}
                color={timerFrozen ? COLORS.gray : primary}
                unfilledColor={timerFrozen ? COLORS.gray : secondary}
                borderWidth={0}
                showsText={false}
                style={{ marginBottom: 0 }}
            />
            <Text style={{ marginBottom: 10 }}> BONUS </Text>
            <View style={{ width: '100%' }}>
                {questions[currentQuestion].pairs.map((pair, index) => (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 }}>
                        <TouchableOpacity
                            style={{
                                width: "40%",
                                padding: 10,
                                alignItems: 'center',
                                backgroundColor: correctMatches[pair[0]] ? secondary : (leftSideSelected === pair[0] ? primary : 'lightgrey'),
                                borderRadius: 8
                            }}
                            onPress={() => !correctMatches[pair[0]] && handleMatchSelection(pair[0], pair[1], 'left')}
                            disabled={correctMatches[pair[0]]}
                        >
                            <Image
                                style={{ width: 32, height: 32 }}
                                source={require('../../../../twlalpha/assets/images/audio.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: "40%",
                                padding: 10,
                                alignItems: 'center',
                                backgroundColor: correctMatches[pair[0]] ? secondary : (selectedOptions[pair[0]] === pair[1] ? primary : 'lightgrey'),
                                borderRadius: 8
                            }}
                            onPress={() => !correctMatches[pair[0]] && handleMatchSelection(pair[0], pair[1], 'right')}
                            disabled={correctMatches[pair[0]]}
                        >
                            <Text style={{        
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: correctMatches[pair[0]] ? 'white' : 'black'}}>
                                    {pair[1]}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            {/* Add empty pairs if less than 4 */}
            {questions[currentQuestion].pairs.length < 4 && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 }}>
                    <TouchableOpacity
                        style={{ padding: 10, backgroundColor: 'lightgrey', borderRadius: 8 }}
                        onPress={() => playSound('ADD URI HERE')}
                    >
                        <Image
                            style={{ width: 32, height: 32 }}
                            source={require('../../../../twlalpha/assets/images/audio.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ padding: 10, backgroundColor: 'lightgrey', borderRadius: 8 }}
                        onPress={() => {}}
                    >
                        <Text>{}</Text>
                    </TouchableOpacity>
                </View>
            )}
            {questions[currentQuestion].pairs.length < 4 && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 }}>
                    <TouchableOpacity
                        style={{ padding: 10, backgroundColor: 'lightgrey', borderRadius: 8 }}
                        onPress={() => {}}
                    >
                        <Image
                            style={{ width: 32, height: 32 }}
                            source={require('../../../../twlalpha/assets/images/audio.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ padding: 10, backgroundColor: 'lightgrey', borderRadius: 8 }}
                        onPress={() => {}}
                    >
                        <Text>{}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default ListeningMatching;
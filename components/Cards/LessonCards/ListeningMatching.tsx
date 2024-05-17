import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Circle } from 'react-native-progress';
import { lessonstyles } from '../../../data';
import { COLORS } from '../../../constants';

const ListeningMatching = (props) => {
    const {
        currentQuestion,
        timeLeft,
        timerFrozen,
        questions,
        toggleSelectOption,
        selectedOptions,
        playSound,
        handleMatch,
        primary,
        secondary
    } = props;

    const handleOptionPress = (pair, option) => {
        if (!pair) {
            console.error("handleOptionPress called with invalid pair:", pair);
            return;
        }

        const currentQuestionData = questions[currentQuestion];
        if (!currentQuestionData) {
            console.error("Invalid currentQuestionData:", currentQuestionData);
            return;
        }

        const isSelected = selectedOptions[pair[0]] === option;

        if (isSelected) {
            toggleSelectOption(pair[0], null);
        } else {
            toggleSelectOption(pair[0], option);
            handleMatch(pair[0], option);
            playSound('listening-matching', questions, currentQuestion, pair[1]);
        }
    };

    const currentQuestionData = questions[currentQuestion];
    if (!currentQuestionData) {
        console.error("Invalid currentQuestionData:", currentQuestionData);
        return null;
    }

    const pairs = currentQuestionData.pairs;
    if (!Array.isArray(pairs)) {
        console.error("Invalid pairs data:", pairs);
        return null;
    }

    return (
        <View style={{ alignItems: 'center', height: "100%" }}>
            <Text style={lessonstyles.question}>
                {currentQuestionData.question}
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
                {pairs.map((pair, index) => (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 }}>
                        <TouchableOpacity
                            style={{
                                width: "40%",
                                padding: 10,
                                alignItems: 'center',
                                backgroundColor: selectedOptions[pair[0]] === pair[0] ? COLORS.turkishRed : 'lightgrey',
                                borderRadius: 8
                            }}
                            onPress={() => playSound(pair[0])}>
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
                                backgroundColor: selectedOptions[pair[0]] === pair[1] ? COLORS.turkishRed : 'lightgrey',
                                borderRadius: 8
                            }}
                            onPress={() => handleOptionPress(pair, pair[1])}>
                            <Text style={lessonstyles.buttonText}>{pair[1]}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            {pairs.length < 4 && (
                <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 }}>
                        <TouchableOpacity
                            style={{ padding: 10, backgroundColor: 'lightgrey', borderRadius: 8 }}
                            onPress={() => {}}>
                            <Image
                                style={{ width: 32, height: 32 }}
                                source={require('../../../../twlalpha/assets/images/audio.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ padding: 10, backgroundColor: 'lightgrey', borderRadius: 8 }}
                            onPress={() => {}}>
                            <Text>{}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 }}>
                        <TouchableOpacity
                            style={{ padding: 10, backgroundColor: 'lightgrey', borderRadius: 8 }}
                            onPress={() => {}}>
                            <Image
                                style={{ width: 32, height: 32 }}
                                source={require('../../../../twlalpha/assets/images/audio.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ padding: 10, backgroundColor: 'lightgrey', borderRadius: 8 }}
                            onPress={() => {}}>
                            <Text>{}</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

export default ListeningMatching;
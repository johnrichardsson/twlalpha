import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Circle } from 'react-native-progress';
import { lessonstyles } from '../../../data';
import { COLORS } from '../../../constants';

// Function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

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

    const pairs = questions[currentQuestion].pairs;

    const [shuffledLeftSide, setShuffledLeftSide] = useState([]);
    const [shuffledRightSide, setShuffledRightSide] = useState([]);
    const [rightSideMap, setRightSideMap] = useState({});

    useEffect(() => {
        const left = pairs.map(pair => pair[0]);
        const right = pairs.map(pair => pair[1]);

        const shuffledLeft = shuffleArray([...left]);
        const shuffledRight = shuffleArray([...right]);

        const rightMap = {};
        shuffledRight.forEach((item, index) => {
            const originalPair = pairs.find(pair => pair[1] === item);
            if (originalPair) {
                rightMap[item] = originalPair[0];
            }
        });

        setShuffledLeftSide(shuffledLeft);
        setShuffledRightSide(shuffledRight);
        setRightSideMap(rightMap);
    }, [currentQuestion]);

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
                {shuffledLeftSide.map((left, index) => (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 }}>
                        <TouchableOpacity
                            style={{
                                width: "40%",
                                padding: 10,
                                alignItems: 'center',
                                backgroundColor: correctMatches[left] ? secondary : (leftSideSelected === left ? primary : 'lightgrey'),
                                borderRadius: 8
                            }}
                            onPress={() => !correctMatches[left] && handleMatchSelection(left, null, 'left')}
                            disabled={correctMatches[left]}
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
                                backgroundColor: correctMatches[rightSideMap[shuffledRightSide[index]]] ? secondary : (selectedOptions[rightSideMap[shuffledRightSide[index]]] === shuffledRightSide[index] ? primary : 'lightgrey'),
                                borderRadius: 8
                            }}
                            onPress={() => !correctMatches[rightSideMap[shuffledRightSide[index]]] && handleMatchSelection(rightSideMap[shuffledRightSide[index]], shuffledRightSide[index], 'right')}
                            disabled={correctMatches[rightSideMap[shuffledRightSide[index]]]}
                        >
                            <Text style={{        
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: correctMatches[rightSideMap[shuffledRightSide[index]]] ? 'white' : 'black'}}>
                                    {shuffledRightSide[index]}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            {/* Add empty pairs if less than 4 */}
            {questions[currentQuestion].pairs.length < 4 && (
                <>
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
                </>
            )}
        </View>
    );
};

export default ListeningMatching;
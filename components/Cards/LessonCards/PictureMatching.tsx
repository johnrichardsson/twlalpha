import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Circle } from 'react-native-progress';
import { lessonstyles } from '../../../data';
import { COLORS } from '../../../constants';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const PictureMatching = (props) => {
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

    if (!questions || questions.length === 0 || currentQuestion === undefined) {
        return <Text>Loading or invalid questions...</Text>;
    }

    const question = questions[currentQuestion];
    if (!question || !question.items) {
        return <Text>Invalid question data...</Text>;
    }

    const items = question.items;

    const [shuffledLeftSide, setShuffledLeftSide] = useState([]);
    const [shuffledRightSide, setShuffledRightSide] = useState([]);
    const [rightSideMap, setRightSideMap] = useState({});

    useEffect(() => {
        if (items.length > 0) {
            const pairs = items.map(item => ({ left: item.translated, right: item.image }));
            const left = pairs.map(pair => pair.left);
            const right = pairs.map(pair => pair.right);
            const shuffledLeft = shuffleArray([...left]);
            const shuffledRight = shuffleArray([...right]);

            const rightMap = {};
            shuffledRight.forEach((item, index) => {
                rightMap[item] = left[index];
            });

            setShuffledLeftSide(shuffledLeft);
            setShuffledRightSide(shuffledRight);
            setRightSideMap(rightMap);
        }
    }, [currentQuestion, items]);

    const handleLeftSelection = (left) => {
        handleMatchSelection(left, null, 'left');
    };

    const handleRightSelection = (right) => {
        if (rightSideMap[right]) {
            handleMatchSelection(rightSideMap[right], right, 'right');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={lessonstyles.question}>
                {question.question}
            </Text>
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
            <View style={styles.pairsContainer}>
                {shuffledLeftSide.map((left, index) => (
                    <View key={index} style={styles.pairRow}>
                        <TouchableOpacity
                            style={[
                                styles.option,
                                {
                                    backgroundColor: correctMatches[left] ? secondary : (leftSideSelected === left ? primary : 'lightgrey'),
                                }
                            ]}
                            onPress={() => handleLeftSelection(left)}
                            disabled={correctMatches[left]}
                        >
                            <Text style={styles.optionText}>{left}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.option,
                                {
                                    backgroundColor: correctMatches[rightSideMap[shuffledRightSide[index]]] ? secondary : (selectedOptions[rightSideMap[shuffledRightSide[index]]] === shuffledRightSide[index] ? primary : 'lightgrey'),
                                }
                            ]}
                            onPress={() => handleRightSelection(shuffledRightSide[index])}
                            disabled={correctMatches[rightSideMap[shuffledRightSide[index]]]}
                        >
                            <Image style={styles.image} source={{ uri: shuffledRightSide[index] }} resizeMode="contain"/>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
    },
    pairsContainer: {
        width: '100%',
    },
    pairRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    option: {
        width: '40%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    optionText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    image: {
        width: 100,
        height: 100,
    },
});

export default PictureMatching;
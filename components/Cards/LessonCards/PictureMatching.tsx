import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
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
        handleAnswer, // This handles score updating and showing the result modal
        primary,
        secondary
    } = props;

    const pairs = questions[currentQuestion].pairs;
    const [shuffledPairs, setShuffledPairs] = useState([]);
    const [correctMatches, setCorrectMatches] = useState({});
    const [selectedLeft, setSelectedLeft] = useState(null);

    useEffect(() => {
        setShuffledPairs(shuffleArray([...pairs]));
        setCorrectMatches({}); // Reset matches at the beginning of each question
    }, [pairs, currentQuestion]);

    const handleLeftSelection = (id) => {
        setSelectedLeft(id);
        playSound(id);
    };

    const handleRightSelection = (id) => {
        if (selectedLeft) {
            const leftMatch = shuffledPairs.find(pair => pair.id === selectedLeft);
            const rightMatch = shuffledPairs.find(pair => pair.id === id);
            
            if (leftMatch && rightMatch && leftMatch.id === rightMatch.id) {
                setCorrectMatches(prev => ({ ...prev, [leftMatch.id]: true }));
                if (Object.keys(correctMatches).length + 1 === pairs.length) {
                    // Call handleAnswer when all matches are correct
                    handleAnswer(true, null, (Object.keys(correctMatches).length + 1) * 25, true); // All correct
                }
            } else {
                // Incorrect match made, calculate score based on correct matches made before error
                const score = Object.keys(correctMatches).length * 25;
                handleAnswer(false, leftMatch.left, score, false); // Incorrect match
            }
            setSelectedLeft(null); // Reset selection after a match attempt
        }
    };

    return (
        <View style={styles.container}>
            <Text style={lessonstyles.question}>
                {questions[currentQuestion]?.question || "Loading question..."}
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
                {shuffledPairs.map((pair, index) => (
                    <View key={index} style={styles.pairRow}>
                        <TouchableOpacity
                            style={[
                                styles.option,
                                { backgroundColor: correctMatches[pair.id] ? secondary : selectedLeft === pair.id ? primary : 'lightgrey' }
                            ]}
                            onPress={() => handleLeftSelection(pair.id)}
                            disabled={correctMatches[pair.id]}
                        >
                            <Text style={styles.optionText}>{pair.left}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.option,
                                { backgroundColor: correctMatches[pair.id] ? secondary : 'lightgrey' }
                            ]}
                            onPress={() => handleRightSelection(pair.id)}
                            disabled={correctMatches[pair.id] || !selectedLeft}
                        >
                            <Image style={styles.image} source={{ uri: pair.right }} resizeMode="contain"/>
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
        height: '100%'
    },
    pairsContainer: {
        width: '100%'
    },
    pairRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 10
    },
    option: {
        width: '40%',
        padding: 10,
        alignItems: 'center',
        borderRadius: 8
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    image: {
        width: 100,
        height: 100
    }
});

export default PictureMatching;
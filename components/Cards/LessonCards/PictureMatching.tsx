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
        handleAnswer,
        primary,
        secondary
    } = props;

    const pairs = questions[currentQuestion].pairs;
    const [shuffledLeftItems, setShuffledLeftItems] = useState([]);
    const [shuffledRightItems, setShuffledRightItems] = useState([]);
    const [correctMatches, setCorrectMatches] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedSide, setSelectedSide] = useState(null);

    useEffect(() => {
        const leftItems = pairs.map(pair => pair.left);
        const rightItems = pairs.map(pair => pair.right);
        setShuffledLeftItems(shuffleArray([...leftItems]));
        setShuffledRightItems(shuffleArray([...rightItems]));
        setCorrectMatches({});
        setSelectedItem(null);
        setSelectedSide(null);
    }, [pairs, currentQuestion]);

    const handleSelection = (item, side) => {
        playSound(item);
        if (!selectedItem) {
            setSelectedItem(item);
            setSelectedSide(side);
        } else if (selectedItem !== item && selectedSide !== side) {
            const matchCondition = pairs.some(pair => 
                (side === 'left' && selectedItem === pair.right && item === pair.left) ||
                (side === 'right' && selectedItem === pair.left && item === pair.right)
            );

            if (matchCondition) {
                setCorrectMatches(prev => ({ ...prev, [item]: true, [selectedItem]: true }));
                if (Object.keys(correctMatches).length + 2 === pairs.length * 2) {
                    handleAnswer(true, null, pairs.length * 25, true); // All correct
                }
            } else {
                handleAnswer(false, null, Object.keys(correctMatches).length * 25, false); // Incorrect match
            }
            setSelectedItem(null);
            setSelectedSide(null);
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
                <View style={styles.sideContainer}>
                    {shuffledLeftItems.map((left, index) => (
                        <TouchableOpacity
                            key={'left-' + index}
                            style={[
                                styles.option,
                                { backgroundColor: correctMatches[left] ? secondary : (selectedItem === left && selectedSide === 'left') ? primary : 'lightgrey' }
                            ]}
                            onPress={() => handleSelection(left, 'left')}
                            disabled={correctMatches[left]}
                        >
                            <Text style={styles.optionText}>{left}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.sideContainer}>
                    {shuffledRightItems.map((right, index) => (
                        <TouchableOpacity
                            key={'right-' + index}
                            style={[
                                styles.option,
                                { backgroundColor: correctMatches[right] ? secondary : (selectedItem === right && selectedSide === 'right') ? primary : 'lightgrey' }
                            ]}
                            onPress={() => handleSelection(right, 'right')}
                            disabled={correctMatches[right]}
                        >
                            <Image style={styles.image} source={{ uri: right }} resizeMode="contain"/>
                        </TouchableOpacity>
                    ))}
                </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    sideContainer: {
        width: '45%',
        alignItems: 'center'
    },
    option: {
        height: '22%',
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%'
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
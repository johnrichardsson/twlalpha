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
        handleSelection,
        correctMatches,
        setCorrectMatches,
        shuffledLeftItems,
        setShuffledLeftItems,
        shuffledRightItems,
        setShuffledRightItems,
        selectedItem,
        setSelectedItem,
        selectedSide,
        setSelectedSide,
        pairs,
        primary,
        secondary
    } = props;

    useEffect(() => {
        const leftItems = pairs.map(pair => pair.left);
        const rightItems = pairs.map(pair => pair.right);
        setShuffledLeftItems(shuffleArray([...leftItems]));
        setShuffledRightItems(shuffleArray([...rightItems]));
        setCorrectMatches({});
        setSelectedItem(null);
        setSelectedSide(null);
    }, [pairs, currentQuestion]);

    return (
        <View style={lessonstyles.container}>
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
            <Text style={lessonstyles.bonusText}> BONUS </Text>
            <View style={lessonstyles.pairsContainer}>
                <View style={lessonstyles.sideContainer}>
                    {shuffledLeftItems.map((left, index) => (
                        <TouchableOpacity
                            key={'left-' + index}
                            style={[
                                lessonstyles.matchingOption,
                                { backgroundColor: correctMatches[left] ? secondary : (selectedItem === left && selectedSide === 'left') ? primary : 'lightgrey' }
                            ]}
                            onPress={() => handleSelection(left, 'left')}
                            disabled={correctMatches[left]}
                        >
                            <Text style={lessonstyles.buttonText}>{left}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={lessonstyles.sideContainer}>
                    {shuffledRightItems.map((right, index) => (
                        <TouchableOpacity
                            key={'right-' + index}
                            style={[
                                lessonstyles.matchingOption,
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

//ALL FUNCTIONS AND STATES EXPORTED
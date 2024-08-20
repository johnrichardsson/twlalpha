import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Circle } from 'react-native-progress';
import { lessonstyles } from '../../../data';
import { COLORS } from '../../../constants';

const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const ListeningMatching = (props) => {
    const {
        currentQuestion,
        timeLeft,
        timerFrozen,
        questions,
        handleSelection,
        correctMatches,
        shuffledLeftItems,
        setShuffledLeftItems,
        shuffledRightItems,
        setShuffledRightItems,
        setCorrectMatches,
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
                            <Image
                                style={lessonstyles.audioIcon}
                                source={require('../../../../twlalpha/assets/images/audio.png')}
                            />
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
                            <Text style={lessonstyles.buttonText}>{right}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default ListeningMatching;

//STYLES UNIFIED!
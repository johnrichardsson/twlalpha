import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Lesson } from '../../../../components';
import { Turkish1aQ } from './Questions/Turkish1aQ';
import { shuffledTurkish1aQ } from './Questions/Turkish1aQ';
 
const Turkish1a = () => {

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.heading}>
                Chapter 1a
            </Text>
            <Lesson questions= {shuffledTurkish1aQ} />
        </View>
    );
};

export default Turkish1a;

const styles = StyleSheet.create({
    heading: {
        fontSize: 25,
        marginBottom: 30,
        marginLeft: 35,
        marginTop: 60,
        fontWeight: 'bold',
        color: 'green',
    }
});
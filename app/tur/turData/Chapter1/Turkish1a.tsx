import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Turkish1aLogic from './Turkish1aLogic';
 
const App = () => {
    return (
        <View style={{ flex: 1, }}>
            <Text style={styles.heading}>
                Interactive Quiz App
            </Text>
            <Turkish1aLogic />
        </View>
    );
};
 
export default App;
const styles = StyleSheet.create({
    heading: {
        fontSize: 25,
        marginBottom: 30,
        marginLeft: 35,
        marginTop: 60,
        fontWeight: 'bold',
        color: 'green',
    }
 
})
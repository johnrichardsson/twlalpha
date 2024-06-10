import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Lesson } from '../../../../components';
import { COLORS } from '../../../../constants';
import { shuffledTurkish1cQ } from './Questions/Turkish1cQ';
 
const Turkish1c = () => {
    const turkish1c15q = shuffledTurkish1cQ.slice(0, 15);

    return (
        <SafeAreaView style={{ height: '100%', alignItems: 'center' }}>
                <View style={styles.headBar}>
                    <Text style={styles.heading}>
                        Chapter 1c
                    </Text>
                </View>
                <View>
                    <Lesson questions= {turkish1c15q} primary= {COLORS.turkishRed} secondary = {COLORS.turkishRedAlt}/>
                </View>
        </SafeAreaView>
    );
};

export default Turkish1c;

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        marginBottom: 30,
        marginLeft: 0,
        marginTop: 15,
        fontWeight: 'bold',
        color: 'white',
        },
    headBar: {
        alignItems:'center',
        width: '100%',
        height: '15%',
        fontWeight: 'bold',
        backgroundColor: COLORS.turkishRed,
        },
});
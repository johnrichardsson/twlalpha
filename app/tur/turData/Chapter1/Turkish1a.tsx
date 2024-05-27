import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Lesson } from '../../../../components';
import { COLORS } from '../../../../constants';
import { shuffledTurkish1aQ } from './Questions/Turkish1aQ';
 
const Turkish1a = () => {
    const first15Questions1a = shuffledTurkish1aQ.slice(0, 15);

    return (
        <SafeAreaView style={{ height: '100%', alignItems: 'center' }}>
                <View style={styles.headBar}>
                    <Text style={styles.heading}>
                        Chapter 1a
                    </Text>
                </View>
                <View>
                    <Lesson questions= {first15Questions1a} primary= {COLORS.turkishRed} secondary = {COLORS.turkishRedAlt}/>
                </View>
        </SafeAreaView>
    );
};

export default Turkish1a;

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
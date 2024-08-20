import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Lesson } from '../../../../components';
import { COLORS } from '../../../../constants';
import { shuffledTurkish1bQ } from './Questions/Turkish1bQ';
import { lessonstyles } from '../../../../data';
 
const Turkish1b = () => {
    const turkish1b15q = shuffledTurkish1bQ.slice(0, 15);

    return (
        <SafeAreaView style={{ flex: 1, height: '100%', width: '100%', alignItems: 'center' }}>
                <View style={styles.headBar}>
                    <Text style={lessonstyles.heading}>
                        Chapter 1b
                    </Text>
                </View>
                <View style= {{ width: '100%', height:'100%', alignItems: 'center' }}>
                    <Lesson questions= {turkish1b15q} primary= {COLORS.turkishRed} secondary = {COLORS.turkishRedAlt}/>
                </View>
        </SafeAreaView>
    );
};

export default Turkish1b;

const styles = StyleSheet.create({
    headBar: {
        alignItems:'center',
        width: '100%',
        height: '15%',
        fontWeight: 'bold',
        backgroundColor: COLORS.turkishRed,
        },
});
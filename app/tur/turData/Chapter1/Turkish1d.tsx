import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Lesson } from '../../../../components';
import { COLORS } from '../../../../constants';
import { Turkish1dQ } from './Questions/Turkish1dQ';
import { lessonstyles } from '../../../../data';
 
const Turkish1d = () => {
    const turkish1d15q = Turkish1dQ.slice(0, 15);

    return (
        <SafeAreaView style={{ flex: 1, height: '100%', width: '100%', alignItems: 'center' }}>
                <View style={styles.headBar}>
                    <Text style={lessonstyles.heading}>
                        Chapter 1c
                    </Text>
                </View>
                <View style= {{ width: '100%', height:'100%', alignItems: 'center' }}>
                    <Lesson questions= {turkish1d15q} primary= {COLORS.turkishRed} secondary = {COLORS.turkishRedAlt}/>
                </View>
        </SafeAreaView>
    );
};

export default Turkish1d;

const styles = StyleSheet.create({
    headBar: {
        alignItems:'center',
        width: '100%',
        height: '15%',
        fontWeight: 'bold',
        backgroundColor: COLORS.turkishRed,
        },
});
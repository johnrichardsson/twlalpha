import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Lesson } from '../../../../components';
import { COLORS } from '../../../../constants';
import { Turkish1eQ } from './Questions/Turkish1eQ';
 
const Turkish1e = () => {
    const turkish1e15q = Turkish1eQ.slice(0, 15);

    return (
        <SafeAreaView style={{ height: '100%', alignItems: 'center' }}>
                <View style={styles.headBar}>
                    <Text style={styles.heading}>
                        Chapter 1e
                    </Text>
                </View>
                <View>
                    <Lesson questions= {turkish1e15q} primary= {COLORS.turkishRed} secondary = {COLORS.turkishRedAlt}/>
                </View>
        </SafeAreaView>
    );
};

export default Turkish1e;

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
import { StyleSheet, Dimensions } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const screenPercentage = (percentage) => {
    return Math.round((percentage * height) / 100);
};

export const lessonstyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    question: {
        color: 'black',
        fontSize: screenPercentage(4),
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'League Gothic Regular',
        textAlign: 'center'
    },
    timer: {
        fontSize: screenPercentage(2), // 2% of screen width
        fontWeight: 'bold',
        backgroundColor: 'yellow',
        paddingVertical: 11,
        marginRight: 120,
        borderRadius: 12,
    },
    bonusText: {
        fontFamily: 'League Gothic Regular',
        fontSize: screenPercentage(3),
        marginBottom: 10,
    },
    heading: {
        fontSize: screenPercentage(4), // 6% of screen width
        marginBottom: 30,
        marginLeft: 0,
        marginTop: 15,
        fontFamily: 'League Gothic Regular',
        letterSpacing: 3,
        fontWeight: '200',
        color: 'white',
        textAlign: 'center'
    },
    option: {
        width: '48%',
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        width: '100%',
        height: 'auto', 
        marginTop: 20,
    },
    matchingContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 10,
    },
    matchingPairContainer: {
        flexDirection: 'row',
        height: 'auto',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    matchingOption: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        aspectRatio: 1, // Ensures square aspect ratio
        maxHeight: '18%', // Adjust as needed
        backgroundColor: 'lightgrey',
    },
    emptyOption: {
        padding: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 8,
    },
    audioIcon: {
        width: '60%', // Adjust as needed for the icon size
        height: '60%', // Adjust as needed for the icon size
        resizeMode: 'contain',
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: screenPercentage(3), // 4% of screen width
        fontWeight: 'bold',
        fontFamily: 'League Gothic Regular'
    },
    score: {
        fontSize: screenPercentage(3), // 3% of screen width
        fontWeight: 'bold',
        marginBottom: 20,
    },
    retestButton: {
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
    },
    correctAnswer: {
        color: 'green',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginVertical: 20,
        borderRadius: 8,
    },
    audioButton: {
        alignItems: 'center', 
        justifyContent: 'center', 
        width: 100, 
        height: 100, 
        borderRadius: 25, 
        marginBottom: 30, 
        backgroundColor: 'lightgrey'
    },
    label: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    submitText: {
        fontFamily: 'League Gothic Regular',
        color: '#ffffff',
        fontSize: screenPercentage(3), // 3% of screen width
    },
    pairsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        flex: 1,
    },
    sideContainer: {
        flex: 1, // Use flex to evenly distribute space
        height:'80%',
        justifyContent: 'space-around', // Space options evenly vertically
    },
    imageDisplay: {
        width: '80%',
        height: 200,
        marginBottom: 20,
    },
    sentenceContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    wordButton: {
        marginHorizontal: 3,
        marginBottom: 5,
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'lightgrey',
    },
    clozeOptionsContainer: {
        backgroundColor:'#cccccc',
        borderRadius: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        width: '90%', // Fixed width container for options
        justifyContent: 'space-evenly', // Center the options in the container
    },
    answerContainer: {
        marginTop: 20,
        backgroundColor: '#cccccc',
        width: '100%',
        borderRadius: 8,
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});
import { StyleSheet } from "react-native";

export const lessonstyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    question: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
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
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    retestButton: {
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
    },
    timer: {
        fontSize: 11,
        fontWeight: 'bold',
        backgroundColor: 'yellow',
        paddingVertical: 11,
        marginRight: 120,
        borderRadius: 12,
    },
    correctAnswer: {
        color: 'green',
    },
});
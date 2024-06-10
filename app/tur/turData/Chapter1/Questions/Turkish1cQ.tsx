export const Turkish1cQ = [
    {
        qType: 'picture-multi',
        question: 'Which is "elma"?',
        options: [
            {
                label: 'apple',
                answer: 'apple',
                image: 'http://app.worldlexicon.org/src/images/apple.png',
            },
            {
                label: 'orange',
                answer: 'orange',
                image: 'http://app.worldlexicon.org/src/images/orange.png',
            },
            {
                label: 'banana',
                answer: 'banana',
                image: 'http://app.worldlexicon.org/src/images/banana.png',
            },
            {
                label: 'pomegranate',
                answer: 'pomegranate',
                image: 'http://app.worldlexicon.org/src/images/pomegranate.png',
            }
        ],
        correctAnswer: 'apple'
    },
];



const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const shuffleOptions = (questions) => {
    return questions.map((question) => {
        if (question.qType === 'listening-multi') {
            return { ...question, options: shuffleArray(question.options) };
        } else if (question.qType === 'listening-matching') {
            return { ...question, pairs: shuffleArray(question.pairs) };
        } else {
            return question; // Handle other question types if needed
        }
    });
};

export const shuffledTurkish1cQ = shuffleArray(shuffleOptions(Turkish1cQ));
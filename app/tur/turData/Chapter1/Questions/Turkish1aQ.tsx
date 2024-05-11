export const Turkish1aQ = [
    {
        question: "Which letter makes this sound?",
        media: "http://app.worldlexicon.org/src/audio/tur/tur-a.mp3",
        options: ["a", "e", "u", "o"],
        correctAnswer: "a",
        qType: 'listening-multi'
    },
    {
        question: "Which letter makes this sound?",
        media: "http://app.worldlexicon.org/src/audio/tur/tur-b.mp3",
        options: ["b", "p", "t", "v"],
        correctAnswer: "b",
        qType: 'listening-multi'
    },
    {
        question: "Which letter makes this sound?",
        media: "http://app.worldlexicon.org/src/audio/tur/tur-d.mp3",
        options: ["d", "t", "j", "l"],
        correctAnswer: "d",
        qType: 'listening-multi'
    },
    {
        question: "Which letter makes this sound?",
        media: "http://app.worldlexicon.org/src/audio/tur/tur-e.mp3",
        options: ["e", "i", "ö", "u"],
        correctAnswer: "e",
        qType: 'listening-multi'
    },
    {
        question: "Which letter makes this sound?",
        media: "http://app.worldlexicon.org/src/audio/tur/tur-f.mp3",
        options: ["f", "v", "b", "p"],
        correctAnswer: "f",
        qType: 'listening-multi'
    },
    {
        question: "Which letter makes this sound?",
        media: "http://app.worldlexicon.org/src/audio/tur/tur-g.mp3",
        options: ["g", "k", "j", "c"],
        correctAnswer: "g",
        qType: 'listening-multi'
    },
    {
        question: "Which letter makes this sound?",
        media: "http://app.worldlexicon.org/src/audio/tur/tur-h.mp3",
        options: ["h", "c", "t", "p"],
        correctAnswer: "h",
        qType: 'listening-multi'
    },
    {
        question: "Which letter makes this sound?",
        media: "http://app.worldlexicon.org/src/audio/tur/tur-i.mp3",
        options: ["i", "u", "e", "ü"],
        correctAnswer: "i",
        qType: 'listening-multi'
    },
    {
        question: "Which letter makes this sound?",
        media: "http://app.worldlexicon.org/src/audio/tur/tur-iu.mp3",
        options: ["ı", "u", "a", "ü"],
        correctAnswer: "ı",
        qType: 'listening-multi'
    },
    {
        question: "Which letter makes this sound?",
        media: "http://app.worldlexicon.org/src/audio/tur/tur-k.mp3",
        options: ["k", "g", "ğ", "c"],
        correctAnswer: "k",
        qType: 'listening-multi'
    },
    {
        question: "Which letter makes this sound?",
        media: "http://app.worldlexicon.org/src/audio/tur/tur-o.mp3",
        options: ["o", "u", "ö", "ı"],
        correctAnswer: "o",
        qType: 'listening-multi'
    },
    {
        question: "Which letter makes this sound?",
        media: "http://app.worldlexicon.org/src/audio/tur/tur-oe.mp3",
        options: ["ö", "u", "e", "i"],
        correctAnswer: "ö",
        qType: 'listening-multi'
    },
    {
        question: "Which letter makes this sound?",
        media: "http://app.worldlexicon.org/src/audio/tur/tur-u.mp3",
        options: ["u", "a", "ı", "o"],
        correctAnswer: "u",
        qType: 'listening-multi'
    },
    {
        question: "Which letter makes this sound?",
        media: "http://app.worldlexicon.org/src/audio/tur/tur-ue.mp3",
        options: ["ü", "u", "ı", "o"],
        correctAnswer: "ü",
        qType: 'listening-multi'
    },
];



export const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const shuffleOptions = (questions) => {
    const shuffledQuestions = questions.map((question) => {
        // Shuffle the options array for each question
        const shuffledOptions = shuffleArray(question.options);
        // Return the question with shuffled options
        return { ...question, options: shuffledOptions };
    });
    return shuffledQuestions;
};


export const shuffledTurkish1aQ = shuffleArray(shuffleOptions(Turkish1aQ));
export const Turkish1aQ = [
    {
        question: "Which letter makes this sound?",
        media: require("../../../../../assets/audio/tur/tur-a.mp3"),
        options: ["a", "e", "u", "o"],
        correctAnswer: "a",
    },
    {
        question: "Which letter makes this sound?",
        media: require("../../../../../assets/audio/tur/tur-b.mp3"),
        options: ["b", "p", "t", "v"],
        correctAnswer: "b",
    },
    {
        question: "Which letter makes this sound?",
        media: require("../../../../../assets/audio/tur/tur-d.mp3"),
        options: ["d", "t", "j", "l"],
        correctAnswer: "d",
    },
    {
        question: "Which letter makes this sound?",
        media: require("../../../../../assets/audio/tur/tur-e.mp3"),
        options: ["e", "i", "ö", "u"],
        correctAnswer: "e",
    },
    {
        question: "Which letter makes this sound?",
        media: require("../../../../../assets/audio/tur/tur-f.mp3"),
        options: ["f", "v", "b", "p"],
        correctAnswer: "f",
    },
    {
        question: "Which letter makes this sound?",
        media: require("../../../../../assets/audio/tur/tur-g.mp3"),
        options: ["g", "k", "j", "c"],
        correctAnswer: "g",
    },
    {
        question: "Which letter makes this sound?",
        media: require("../../../../../assets/audio/tur/tur-g.mp3"),
        options: ["h", "c", "t", "p"],
        correctAnswer: "h",
    },
    {
        question: "Which letter makes this sound?",
        media: require("../../../../../assets/audio/tur/tur-i.mp3"),
        options: ["i", "u", "e", "ü"],
        correctAnswer: "i",
    },
    {
        question: "Which letter makes this sound?",
        media: require("../../../../../assets/audio/tur/tur-iu.mp3"),
        options: ["ı", "u", "a", "ü"],
        correctAnswer: "ı",
    },
    {
        question: "Which letter makes this sound?",
        media: require("../../../../../assets/audio/tur/tur-k.mp3"),
        options: ["k", "g", "ğ", "c"],
        correctAnswer: "k",
    },
    {
        question: "Which letter makes this sound?",
        media: require("../../../../../assets/audio/tur/tur-o.mp3"),
        options: ["o", "u", "ö", "ı"],
        correctAnswer: "o",
    },
    {
        question: "Which letter makes this sound?",
        media: require("../../../../../assets/audio/tur/tur-oe.mp3"),
        options: ["ö", "u", "e", "i"],
        correctAnswer: "ö",
    },
    {
        question: "Which letter makes this sound?",
        media: require("../../../../../assets/audio/tur/tur-u.mp3"),
        options: ["u", "a", "ı", "o"],
        correctAnswer: "u",
    },
    {
        question: "Which letter makes this sound?",
        media: require("../../../../../assets/audio/tur/tur-ue.mp3"),
        options: ["ü", "u", "ı", "o"],
        correctAnswer: "ü",
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
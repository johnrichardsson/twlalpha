// Function to shuffle an array
const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

// Function to ensure correct option is included
const ensureCorrectOption = (options, correctItem, numOptions) => {
    if (!options.includes(correctItem)) {
        options[Math.floor(Math.random() * numOptions)] = correctItem;
    }
    return options;
};

// Select options and ensure the correct one is included
const selectOptions = (items, correctItem, numOptions = 4) => {
    const shuffled = shuffleArray([...items]);
    const options = shuffled.slice(0, numOptions);
    return ensureCorrectOption(options, correctItem, numOptions);
};

// Generates a single question of specified type
const generateQuestion = (item, config) => {
    const options = selectOptions(items, item, 4);
    switch (config.type) {
        case 'listening-multi':
            return {
                qType: 'listening-multi',
                question: `${config.questionText}`,
                options,
                correctAnswer: item.label,
                media: item.media,
            };
        case 'listening-matching':
            return {
                qType: 'listening-matching',
                question: config.questionText,
                pairs: options.map(opt => ({ left: opt.media, right: opt.label })),
                items: options,
            };
        case 'listening-typing':
            return {
                qType: 'listening-typing',
                question: config.questionText,
                media: item.media,
                correctAnswer: item.translated,
            };
        default:
            return null;  // Return null if type is not recognized
    }
};

// Configuration array
const questionConfigs = [
    { type: 'listening-multi', questionText: 'Which letter makes this sound?' },
    { type: 'listening-matching', questionText: 'Match the letters to the sounds:' },
    { type: 'listening-typing', questionText: 'Type the letter you hear!' },
];

// Generate questions for all items
const generateQuiz = (items, configs) => {
    return items.flatMap(item =>
        configs.map(config => generateQuestion(item, config))
    );
};

// Example items array for Turkish 1a
const Turkish1aItems = [
    { label: 'a', translated: 'a', media: 'http://app.worldlexicon.org/src/audio/tur/tur-a.mp3' },
    { label: 'b', translated: 'b', media: 'http://app.worldlexicon.org/src/audio/tur/tur-b.mp3' },
    { label: 'd', translated: 'd', media: 'http://app.worldlexicon.org/src/audio/tur/tur-d.mp3' },
    { label: 'e', translated: 'e', media: 'http://app.worldlexicon.org/src/audio/tur/tur-e.mp3' },
    { label: 'f', translated: 'f', media: 'http://app.worldlexicon.org/src/audio/tur/tur-f.mp3' },
    { label: 'g', translated: 'g', media: 'http://app.worldlexicon.org/src/audio/tur/tur-g.mp3' },
    { label: 'h', translated: 'h', media: 'http://app.worldlexicon.org/src/audio/tur/tur-h.mp3' },
    { label: 'i', translated: 'i', media: 'http://app.worldlexicon.org/src/audio/tur/tur-i.mp3' },
    { label: 'ı', translated: 'ı', media: 'http://app.worldlexicon.org/src/audio/tur/tur-iu.mp3' },
    { label: 'k', translated: 'k', media: 'http://app.worldlexicon.org/src/audio/tur/tur-k.mp3' },
    { label: 'o', translated: 'o', media: 'http://app.worldlexicon.org/src/audio/tur/tur-o.mp3' },
    { label: 'ö', translated: 'ö', media: 'http://app.worldlexicon.org/src/audio/tur/tur-oe.mp3' },
    { label: 'u', translated: 'u', media: 'http://app.worldlexicon.org/src/audio/tur/tur-u.mp3' },
    { label: 'ü', translated: 'ü', media: 'http://app.worldlexicon.org/src/audio/tur/tur-ue.mp3' },
];

const items = Turkish1aItems

// Generate quiz questions
const quizQuestions = generateQuiz(Turkish1aItems, questionConfigs);
const shuffledQuizQuestions = shuffleArray([...quizQuestions]);

export const Turkish1aQ = shuffledQuizQuestions;
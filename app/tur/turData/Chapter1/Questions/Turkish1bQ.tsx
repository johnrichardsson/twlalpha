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
    const options = selectOptions(Turkish1bItems, item, 4);
    switch (config.type) {
        case 'listening-multi':
            return {
                qType: 'listening-multi',
                question: `${config.questionText}`,
                options: options.map(opt => opt.label),
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

// Define the items array
const Turkish1bItems = [
    { label: 'c', translated: 'c', media: 'http://app.worldlexicon.org/src/audio/tur/tur-c.mp3' },
    { label: 'ç', translated: 'ç', media: 'http://app.worldlexicon.org/src/audio/tur/tur-ch.mp3' },
    { label: 'ğ', translated: 'ğ', media: 'http://app.worldlexicon.org/src/audio/tur/tur-gh.mp3' },
    { label: 'j', translated: 'j', media: 'http://app.worldlexicon.org/src/audio/tur/tur-j.mp3' },
    { label: 'l', translated: 'l', media: 'http://app.worldlexicon.org/src/audio/tur/tur-l.mp3' },
    { label: 'm', translated: 'm', media: 'http://app.worldlexicon.org/src/audio/tur/tur-m.mp3' },
    { label: 'n', translated: 'n', media: 'http://app.worldlexicon.org/src/audio/tur/tur-n.mp3' },
    { label: 'p', translated: 'p', media: 'http://app.worldlexicon.org/src/audio/tur/tur-p.mp3' },
    { label: 'r', translated: 'r', media: 'http://app.worldlexicon.org/src/audio/tur/tur-r.mp3' },
    { label: 's', translated: 's', media: 'http://app.worldlexicon.org/src/audio/tur/tur-s.mp3' },
    { label: 'ş', translated: 'ş', media: 'http://app.worldlexicon.org/src/audio/tur/tur-sh.mp3' },
    { label: 't', translated: 't', media: 'http://app.worldlexicon.org/src/audio/tur/tur-t.mp3' },
    { label: 'v', translated: 'v', media: 'http://app.worldlexicon.org/src/audio/tur/tur-v.mp3' },
    { label: 'y', translated: 'y', media: 'http://app.worldlexicon.org/src/audio/tur/tur-y.mp3' },
    { label: 'z', translated: 'z', media: 'http://app.worldlexicon.org/src/audio/tur/tur-z.mp3' },
];


// Generate quiz questions
const quizQuestions = generateQuiz(Turkish1bItems, questionConfigs);
const shuffledQuizQuestions = shuffleArray([...quizQuestions]);

export const Turkish1bQ = shuffledQuizQuestions;
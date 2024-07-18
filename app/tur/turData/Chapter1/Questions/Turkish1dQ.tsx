export const Turkish1dItems = [
    { label: 'Turkey', translated: 'Türkiye', image: 'http://app.worldlexicon.org/src/images/turkiye.png', media: 'http://app.worldlexicon.org/src/audio/tur/tuerkiye.mp3' },
    { label: 'USA', translated: 'Amerika', image: 'http://app.worldlexicon.org/src/images/america.png', media: 'http://app.worldlexicon.org/src/audio/tur/amerika.mp3' },
    { label: 'England', translated: 'İngiltere', image: 'http://app.worldlexicon.org/src/images/england.png', media: 'http://app.worldlexicon.org/src/audio/tur/ingiltere.mp3' },
    { label: 'France', translated: 'Fransa', image: 'http://app.worldlexicon.org/src/images/france.png', media: 'http://app.worldlexicon.org/src/audio/tur/fransa.mp3' },
    { label: 'Greece', translated: 'Yunanistan', image: 'http://app.worldlexicon.org/src/images/greece.png', media: 'http://app.worldlexicon.org/src/audio/tur/yunanistan.mp3' },
    { label: 'Italy', translated: 'İtalya', image: 'http://app.worldlexicon.org/src/images/italy.png', media: 'http://app.worldlexicon.org/src/audio/tur/italya.mp3' },
    { label: 'Saudi Arabia', translated: 'Suudi Arapistan', image: 'http://app.worldlexicon.org/src/images/saudi_arabia.png', media: 'http://app.worldlexicon.org/src/audio/tur/suudi_arapistan.mp3' },
    { label: 'Egypt', translated: 'Mısır', image: 'http://app.worldlexicon.org/src/images/egypt.png', media: 'http://app.worldlexicon.org/src/audio/tur/misir.mp3' },
    { label: 'Azerbaijan', translated: 'Azerbaycan', image: 'http://app.worldlexicon.org/src/images/azerbaijan.png', media: 'http://app.worldlexicon.org/src/audio/tur/azerbaycan.mp3' },
    { label: 'Russia', translated: 'Rusya', image: 'http://app.worldlexicon.org/src/images/russia.png', media: 'http://app.worldlexicon.org/src/audio/tur/rusya.mp3' },
    { label: 'China', translated: 'Çin', image: 'http://app.worldlexicon.org/src/images/china.png', media: 'http://app.worldlexicon.org/src/audio/tur/chin.mp3' },
    { label: 'India', translated: 'Hindistan', image: 'http://app.worldlexicon.org/src/images/india.png', media: 'http://app.worldlexicon.org/src/audio/tur/hindistan.mp3' },
    { label: 'Japan', translated: 'Japonya', image: 'http://app.worldlexicon.org/src/images/japan.png', media: 'http://app.worldlexicon.org/src/audio/tur/japonya.mp3' },
    { label: 'Portugal', translated: 'Portekiz', image: 'http://app.worldlexicon.org/src/images/portugal.png', media: 'http://app.worldlexicon.org/src/audio/tur/portekiz.mp3' },
    { label: 'South Africa', translated: 'Güney Afrika', image: 'http://app.worldlexicon.org/src/images/southafrica.png', media: 'http://app.worldlexicon.org/src/audio/tur/gueney_afrika.mp3' },
    { label: 'Mexico', translated: 'Meksika', image: 'http://app.worldlexicon.org/src/images/mexico.png', media: 'http://app.worldlexicon.org/src/audio/tur/meksika.mp3' },
    { label: 'Germany', translated: 'Almanya', image: 'http://app.worldlexicon.org/src/images/germany.png', media: 'http://app.worldlexicon.org/src/audio/tur/almanya.mp3' },
    { label: 'Australia', translated: 'Avustralya', image: 'http://app.worldlexicon.org/src/images/australia.png', media: 'http://app.worldlexicon.org/src/audio/tur/avustralya.mp3' },
    { label: 'New Zealand', translated: 'Yeni Zelanda', image: 'http://app.worldlexicon.org/src/images/new_zealand.jpg', media: 'http://app.worldlexicon.org/src/audio/tur/yeni_zelanda.mp3'},
];

const items = Turkish1dItems

// Function to shuffle an array
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
        case 'picture-multi':
            return {
                qType: 'picture-multi',
                question: `${config.questionText} "${item.translated}"?`,
                options,
                correctAnswer: item.label,
                translated: item.translated
            };
        case 'image-multi':
            return {
                qType: 'image-multi',
                question: config.questionText,
                image: item.image,
                media: item.media,
                options: options.map(opt => opt.translated),
                correctAnswer: item.translated
            };
        case 'picture-matching':
            return {
                qType: 'picture-matching',
                question: config.questionText,
                pairs: options.map(opt => ({ left: opt.translated, right: opt.image })),
                items: options
            };
        case 'image-typing':
            return {
                qType: 'image-typing',
                question: config.questionText,
                image: item.image,
                media: item.media,
                correctAnswer: item.translated,
            };
        default:
            return null;  // Return null if type is not recognized
    }
};

// Configuration array
const questionConfigs = [
    { type: 'picture-multi', questionText: 'Which one is' },
    { type: 'image-multi', questionText: 'What is this?' },
    { type: 'image-typing', questionText: 'What is this?' },
    { type: 'picture-matching', questionText: 'Match the images with their Turkish names' }
];

// Generate questions for all items
const generateQuiz = (items, configs) => {
    return items.flatMap(item =>
        configs.map(config => generateQuestion(item, config))
    );
};

const quizQuestions = generateQuiz(Turkish1dItems, questionConfigs);
const shuffledQuizQuestions = shuffleArray([...quizQuestions]);

export const Turkish1dQ = shuffledQuizQuestions;
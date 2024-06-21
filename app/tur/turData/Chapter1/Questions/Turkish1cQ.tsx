const items = [
    { label: 'apple', translated: 'elma', image: 'http://app.worldlexicon.org/src/images/apple.png', media: 'http://app.worldlexicon.org/src/audio/tur/elma.mp3' },
    { label: 'orange', translated: 'portakal', image: 'http://app.worldlexicon.org/src/images/orange.png', media: 'http://app.worldlexicon.org/src/audio/tur/portakal.mp3' },
    { label: 'banana', translated: 'muz', image: 'http://app.worldlexicon.org/src/images/banana.png', media: 'http://app.worldlexicon.org/src/audio/tur/muz.mp3' },
    { label: 'pomegranate', translated: 'nar', image: 'http://app.worldlexicon.org/src/images/pomegranate.png', media: 'http://app.worldlexicon.org/src/audio/tur/nar.mp3' },
    { label: 'chicken meat', translated: 'tavuk eti', image: 'http://app.worldlexicon.org/src/images/chicken_meat.png', media: 'http://app.worldlexicon.org/src/audio/tur/tavuk_eti.mp3' },
    { label: 'fish meat', translated: 'balık eti', image: 'http://app.worldlexicon.org/src/images/fısh_meat.png', media: 'http://app.worldlexicon.org/src/audio/tur/balik_eti.mp3' },
    { label: 'beef', translated: 'et', image: 'http://app.worldlexicon.org/src/images/beef.png', media: 'http://app.worldlexicon.org/src/audio/tur/et.mp3' },
    { label: 'food', translated: 'yemek', image: 'http://app.worldlexicon.org/src/images/food.png', media: 'http://app.worldlexicon.org/src/audio/tur/yemek.mp3' },
    { label: 'water', translated: 'su', image: 'http://app.worldlexicon.org/src/images/water.png', media: 'http://app.worldlexicon.org/src/audio/tur/su.mp3' },
    { label: 'parsley', translated: 'maydanoz', image: 'http://app.worldlexicon.org/src/images/parsley.png', media: 'http://app.worldlexicon.org/src/audio/tur/maydanoz.mp3' },
    { label: 'salt', translated: 'tuz', image: 'http://app.worldlexicon.org/src/images/salt.png', media: 'http://app.worldlexicon.org/src/audio/tur/tuz.mp3' },
    { label: 'pasta', translated: 'makarna', image: 'http://app.worldlexicon.org/src/images/pasta.png', media: 'http://app.worldlexicon.org/src/audio/tur/makarna.mp3' },
    { label: 'vegetables', translated: 'sebzeler', image: 'http://app.worldlexicon.org/src/images/vegetables.png', media: 'http://app.worldlexicon.org/src/audio/tur/sebzeler.mp3' },
    { label: 'potato', translated: 'patates', image: 'http://app.worldlexicon.org/src/images/potato.png', media: 'http://app.worldlexicon.org/src/audio/tur/potato.mp3' },
    { label: 'tomato', translated: 'domates', image: 'http://app.worldlexicon.org/src/images/tomato.png', media: 'http://app.worldlexicon.org/src/audio/tur/domates.mp3' },
    { label: 'spinach', translated: 'ıspanak', image: 'http://app.worldlexicon.org/src/images/spinach.png', media: 'http://app.worldlexicon.org/src/audio/tur/ispanak.mp3' },
    { label: 'pepper', translated: 'karabiber', image: 'http://app.worldlexicon.org/src/images/pepper_spice.png', media: 'http://app.worldlexicon.org/src/audio/tur/karabiber.mp3' },
    { label: 'chili pepper flakes', translated: 'acı biber', image: 'http://app.worldlexicon.org/src/images/paprika.png', media: 'http://app.worldlexicon.org/src/audio/tur/acibiber.mp3' },
    { label: 'soda', translated: 'gazoz', image: 'http://app.worldlexicon.org/src/images/soda.png', media: 'http://app.worldlexicon.org/src/audio/tur/gazoz.mp3'},
    { label: 'breakfast', translated: 'kahvaltı', image: 'http://app.worldlexicon.org/src/images/breakfast.png', media: 'http://app.worldlexicon.org/src/audio/tur/kahvalti.mp3'},
    { label: 'lunch', translated: 'öğle yemeği', image: 'http://app.worldlexicon.org/src/images/lunch.png', media: 'http://app.worldlexicon.org/src/audio/tur/ogle_yemegi.mp3'},
    { label: 'fruit juice', translated: 'meyve suyu', image: 'http://app.worldlexicon.org/src/images/juice.png', media: 'http://app.worldlexicon.org/src/audio/tur/meyvesuyu.mp3'},
];

// Function to shuffle an array
const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

// Function to generate a PictureMulti question
const generatePictureMultiQuestion = (questionText, correctLabel) => {
    const shuffledItems = shuffleArray(items);
    const correctItem = shuffledItems.find(item => item.label === correctLabel);

    if (!correctItem) {
        throw new Error(`Correct label '${correctLabel}' not found in items.`);
    }

    const options = shuffledItems.slice(0, 4);
    if (!options.includes(correctItem)) {
        options[Math.floor(Math.random() * 4)] = correctItem;
    }

    return {
        qType: 'picture-multi',
        question: questionText,
        options,
        correctAnswer: correctLabel,
        translated: correctItem.translated
    };
};

// Function to generate a PictureMatching question
const generatePictureMatchingQuestion = (questionText, questionId) => {
    const shuffledItems = shuffleArray(items);
    const pairs = shuffledItems.slice(0, 4).map(item => ({
        left: item.translated,
        right: item.image,
        id: item.label // Use a unique identifier for each item
    }));

    return {
        id: questionId, // Add a unique ID for the question
        qType: 'picture-matching',
        question: questionText,
        pairs,
        items: shuffledItems.slice(0, 4)
    };
};

// Function to generate an ImageMulti question
const generateImageMultiQuestion = (questionText, image, correctTranslated) => {
    const correctItem = items.find(item => item.translated === correctTranslated);
    if (!correctItem) {
        throw new Error(`Item with translated name '${correctTranslated}' not found.`);
    }
    const shuffledItems = shuffleArray(items);
    const options = shuffledItems.slice(0, 4).map(item => item.translated);
    if (!options.includes(correctItem.translated)) {
        options[Math.floor(Math.random() * 4)] = correctItem.translated;
    }
    return {
        qType: 'image-multi',
        question: questionText,
        image,
        media: correctItem.media,
        options,
        correctAnswer: correctItem.translated
    };
};

// Function to generate an ImageTyping question
const generateImageTypingQuestion = (questionText, correctLabel) => {
    const correctItem = items.find(item => item.label === correctLabel);

    if (!correctItem) {
        throw new Error(`Correct label '${correctLabel}' not found in items.`);
    }

    return {
        qType: 'image-typing',
        question: questionText,
        image: correctItem.image,
        media: correctItem.media,
        correctAnswer: correctItem.translated,
    };
};

// Generate the questions
export const Turkish1cQ = [
    // PictureMulti
    generatePictureMultiQuestion('Which is "elma"?', 'apple'),
    generatePictureMultiQuestion('Which is "portakal"?', 'orange'),
    generatePictureMultiQuestion('Which is "muz"?', 'banana'),
    generatePictureMultiQuestion('Which is "nar"?', 'pomegranate'),
    generatePictureMultiQuestion('Which is "tavuk eti"?', 'chicken meat'),
    generatePictureMultiQuestion('Which is "et"?', 'beef'),
    generatePictureMultiQuestion('Which is "balık eti"?', 'fish meat'),
    generatePictureMultiQuestion('Which is "yemek"?', 'food'),
    generatePictureMultiQuestion('Which is "su"?', 'water'),
    generatePictureMultiQuestion('Which is "maydanoz"?', 'parsley'),
    generatePictureMultiQuestion('Which is "tuz"?', 'salt'),
    generatePictureMultiQuestion('Which is "makarna"?', 'pasta'),
    generatePictureMultiQuestion('Which is "sebzeler"?', 'vegetables'),
    generatePictureMultiQuestion('Which is "patates"?', 'potato'),
    generatePictureMultiQuestion('Which is "domates"?', 'tomato'),
    generatePictureMultiQuestion('Which is "ıspanak"?', 'spinach'),
    generatePictureMultiQuestion('Which is "karabiber"?', 'pepper'),
    generatePictureMultiQuestion('Which is "gazoz"?', 'soda'),
    generatePictureMultiQuestion('Which is "kahvaltı"?', 'breakfast'),
    generatePictureMultiQuestion('Which is "öğle yemeği"?', 'lunch'),
    generatePictureMultiQuestion('Which is "meyve suyu"?', 'fruit juice'),

    // ImageMulti
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/apple.png', 'elma'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/orange.png', 'portakal'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/banana.png', 'muz'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/pomegranate.png', 'nar'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/chicken_meat.png', 'tavuk eti'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/beef.png', 'et'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/fısh_meat.png', 'balık eti'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/food.png', 'yemek'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/water.png', 'su'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/parsley.png', 'maydanoz'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/salt.png', 'tuz'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/pasta.png', 'makarna'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/vegetables.png', 'sebzeler'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/potato.png', 'patates'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/tomato.png', 'domates'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/spinach.png', 'ıspanak'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/pepper_spice.png', 'karabiber'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/soda.png', 'gazoz'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/breakfast.png', 'kahvaltı'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/lunch.png', 'öğle yemeği'),
    generateImageMultiQuestion('What is this?', 'http://app.worldlexicon.org/src/images/juice.png', 'meyve suyu'),

    // ImageTyping
    generateImageTypingQuestion('Type what you see here in Turkish!', 'apple'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'orange'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'banana'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'pomegranate'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'chicken meat'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'beef'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'fish meat'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'food'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'water'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'parsley'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'salt'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'pasta'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'vegetables'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'potato'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'tomato'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'spinach'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'pepper'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'soda'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'breakfast'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'lunch'),
    generateImageTypingQuestion('Type what you see here in Turkish!', 'fruit juice'),

    // PictureMatching
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q1'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q2'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q3'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q4'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q5'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q6'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q7'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q8'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q9'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q10'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q11'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q12'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q13'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q14'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q15'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q16'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q17'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q18'),
    generatePictureMatchingQuestion('Match the images with their Turkish names', 'q19'),
];
// Shuffle the questions
export const shuffledTurkish1cQ = shuffleArray(Turkish1cQ);
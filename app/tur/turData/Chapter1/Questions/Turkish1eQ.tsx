export const Turkish1eItems = [
    {
        type: 'grammar-cloze',
        sentence: '___ mutluyum.',
        options: ['Ben', 'Sen', 'O', 'Biz'],
        correctAnswer: 'Ben',
        translated: 'I am happy.',
        explanation: '"Ben" means "I".',
        words: [
            { text: '___', placeholder: true },
            { text: 'mutluyum.', root: 'mutlu', translation: 'happy' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: '___ neredesin?',
        options: ['O', 'Sen', 'Onlar', 'Biz'],
        correctAnswer: 'Sen',
        translated: 'Where are you?',
        explanation: '"Sen" means "you" (singular).',
        words: [
            { text: '___', placeholder: true },
            { text: 'neredesin?', root: 'nerede', translation: 'where' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: '___ buradalar.',
        options: ['Onlar', 'O', 'Sen', 'Biz'],
        correctAnswer: 'Onlar',
        translated: 'They are here.',
        explanation: '"Onlar" means "they".',
        words: [
            { text: '___', placeholder: true },
            { text: 'buradalar.', root: 'burada', translation: 'here' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: '___ evdeyim.',
        options: ['Ben', 'Sen', 'O', 'Biz'],
        correctAnswer: 'Ben',
        translated: 'I am at home.',
        explanation: '"Ben" means "I".',
        words: [
            { text: '___', placeholder: true },
            { text: 'evdeyim.', root: 'ev', translation: 'home', Sroot: 'evde', Stranslation: 'at home' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: '___ yorgunsun.',
        options: ['Ben', 'Sen', 'O', 'Biz'],
        correctAnswer: 'Sen',
        translated: 'You are tired.',
        explanation: '"Sen" means "you" (singular).',
        words: [
            { text: '___', placeholder: true },
            { text: 'yorgunsun.', root: 'yorgun', translation: 'tired' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: '___ okulda.',
        options: ['O', 'Onlar', 'Biz', 'Sen'],
        correctAnswer: 'O',
        translated: 'He/She is at school.',
        explanation: '"O" means "he/she".',
        words: [
            { text: '___', placeholder: true },
            { text: 'okulda.', root: 'okul', translation: 'school', Sroot: 'okulda', Stranslation: 'at school' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: '___ mutlusun.',
        options: ['Ben', 'Sen', 'O', 'Biz'],
        correctAnswer: 'Sen',
        translated: 'You are happy.',
        explanation: '"Sen" means "you" (singular).',
        words: [
            { text: '___', placeholder: true },
            { text: 'mutlusun.', root: 'mutlu', translation: 'happy' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: '___ buradayım.',
        options: ['Ben', 'Sen', 'O', 'Biz'],
        correctAnswer: 'Ben',
        translated: 'I am here.',
        explanation: '"Ben" means "I".',
        words: [
            { text: '___', placeholder: true },
            { text: 'buradayım.', root: 'burada', translation: 'here' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: '___ hazır mısın?',
        options: ['Ben', 'Sen', 'O', 'Biz'],
        correctAnswer: 'Sen',
        translated: 'Are you ready?',
        explanation: '"Sen" means "you" (singular).',
        words: [
            { text: '___', placeholder: true },
            { text: 'hazır', root: 'hazır', translation: 'ready' },
            { text: 'mısın?', root: 'misin/mısın/musun/müsün', translation: 'are you?' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: 'Ben mutlu___.',
        options: ['yum', 'sun', 'suz', 'yuz'],
        correctAnswer: 'yum',
        translated: 'I am happy.',
        explanation: '"-yum" is the correct ending for the first person singular with "ben".',
        words: [
            { text: 'Ben', root: 'ben', translation: 'I' },
            { text: 'mutlu___.', root: 'mutlu', translation: 'happy' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: 'Sen yorgun___.',
        options: ['sun', 'suz', 'yum', 'yuz'],
        correctAnswer: 'sun',
        translated: 'You are tired.',
        explanation: '"-sun" is used with "sen" for the second person singular.',
        words: [
            { text: 'Sen', root: 'sen', translation: 'you (singular)' },
            { text: 'yorgun___.', root: 'yorgun', translation: 'tired' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: 'O üzgün___.',
        options: ['sün', 'sünüz', '(none)', 'yüz'],
        correctAnswer: '(none)',
        translated: 'He/She is sad.',
        explanation: 'No suffix is required for "o" in this context.',
        words: [
            { text: 'O', root: 'o', translation: 'he', translation2: 'she', translation3: 'it'  },
            { text: 'üzgün___.', root: 'üzgün', translation: 'sad' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: 'Biz mutlu___.',
        options: ['yuz', 'sun', 'sunuz', 'yum'],
        correctAnswer: 'yuz',
        translated: 'We are happy.',
        explanation: '"-yuz" is used with "biz" for the first person plural.',
        words: [
            { text: 'Biz', root: 'biz', translation: 'we'},
            { text: 'mutlu___.', root: 'mutlu', translation: 'happy' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: 'Siz yorgun___.',
        options: ['sun', 'sunuz', 'uz', 'um'],
        correctAnswer: 'sunuz',
        translated: 'You are tired.',
        explanation: '"-sunuz" is used with "siz" for the second person plural or formal.',
        words: [
            { text: 'Siz', root: 'siz', translation: 'you (formal)', translation2: 'you all'},
            { text: 'yorgun___.', root: 'yorgun', translation: 'tired' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: 'Onlar üzgün___.',
        options: ['ler', 'lar', 'sun', '(none)'],
        correctAnswer: 'ler',
        translated: 'They are sad.',
        explanation: '"-ler" is the plural suffix used with "onlar".',
        words: [
            { text: 'Onlar', root: 'onlar', translation: 'they'},
            { text: 'üzgün___.', root: 'üzgün', translation: 'sad' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: 'Ben güçlü___.',
        options: ['yüm', 'sün', 'sünüz', 'yuz'],
        correctAnswer: 'yüm',
        translated: 'I am strong.',
        explanation: '"-yum" is used with "ben" for adjectives.',
        words: [
            { text: 'Ben', root: 'ben', translation: 'I'},
            { text: 'güçlü___.', root: 'güçlü', translation: 'strong' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: 'Sen hızlı___ .',
        options: ['sın', 'suz', 'yım', 'yuz'],
        correctAnswer: 'sın',
        translated: 'You are fast.',
        explanation: '"-sın" is used with "sen" for adjectives.',
        words: [
            { text: 'Sen', root: 'sen', translation: 'you'},
            { text: 'hızlı___.', root: 'hızlı', translation: 'fast' }
        ]
    },
    {
        type: 'grammar-cloze',
        sentence: 'O zengin___.',
        options: ['in', 'iz', '(none)', 'siniz'],
        correctAnswer: '(none)',
        translated: 'He/She is rich.',
        explanation: 'No suffix is needed for "o" with adjectives.',
        words: [
            { text: 'O', root: 'o', translation: 'he', translation2: 'she', translation3: 'it'  },
            { text: 'zengin___.', root: 'zengin', translation: 'rich' }
        ]
        
    },
    {
        type: 'grammar-cloze',
        sentence: 'Onlar güzel___.',
        options: ['ler', 'lar', 'sun', 'suz'],
        correctAnswer: 'ler',
        translated: 'They are beautiful.',
        explanation: '"-ler" is used with "onlar" for adjectives.',
        words: [
            { text: 'Onlar', root: 'onlar', translation: 'they'},
            { text: 'güzel___.', root: 'güzel', translation: 'beautiful' }
        ]
    }
];

const items = Turkish1eItems

// Function to shuffle an array
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Function to select options and ensure the correct one is included
const grammarSelectOptions = (items, correctItem, numOptions = 4) => {
    const shuffled = shuffleArray([...items]);
    const options = shuffled.slice(0, numOptions);
    if (!options.includes(correctItem)) {
        options[Math.floor(Math.random() * numOptions)] = correctItem;
    }
    return options;
};

// Generate cloze test questions dynamically
const generateClozeTestQuestion = item => {
    const options = grammarSelectOptions(item.options, item.correctAnswer);
    return {
        type: 'grammar-cloze',
        question: item.sentence,
        options,
        correctAnswer: item.correctAnswer,
        translated: item.translated,
        explanation: item.explanation,
        words: item.words || []  
    };
};

// Generate questions for all grammar items
const generateGrammarQuiz = items => {
    return items.map(item => generateClozeTestQuestion(item));
};

const grammarQuizQuestions = generateGrammarQuiz(Turkish1eItems);
const shuffledGrammarQuizQuestions = shuffleArray([...grammarQuizQuestions]);

export const Turkish1eQ = shuffledGrammarQuizQuestions;
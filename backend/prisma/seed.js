import {PrismaClient} from '@prisma/client';
import {ReadingFillInTheBlanksRWData, ReadingFillInTheBlanksRData,ReadingMCQMAData,ReadingMCQSAData,ReadingReorderParagraphData} from './seedData/Reading/index.js';
import {HighlightCorrectSummary,HighlightIncorrectWord,ListeningFillinTheBlanks,MCQMA,MCQSA,SelectMissingWord,SummarizeSpokenText,WriteFromDictation} from './seedData/Listening/index.js'
import {AnswerShortQuestions,DescribeImage,ReadAloud,RepeatSentence,RetellLecture} from './seedData/Speaking/index.js'
import {SummarizeWrittenText,WriteEssay} from './seedData/Writing/index.js'

const prisma = new PrismaClient();

function extractAnswersFromHTML(htmlString) {
    // Regular expression to match <span id='cAns'>text</span>
    const regex = /<span id=['"]?cAns['"]?>(.*?)<\/span>/g;
    // Array to hold the answers
    let answers = [];

    // Temporary variable to store match results
    let match;

    // Iterate over all matches in the HTML string
    while ((match = regex.exec(htmlString)) !== null) {
        // Add the captured group (text inside the span) to the answers array
        answers.push(match[1]);
    }

    return answers;
}

function getOrderFromOptions(options) {
    let orderedOptions = ""
    let optionsArray = []
    for (let i = 0; i < options.length; i++) {
        const orderedOption = options.find(option => option.index === i + 1);
        orderedOptions+=orderedOption.options;
    }
    optionsArray.push(orderedOptions);
    return optionsArray;
}


async function main() {

    for (const item of ReadingFillInTheBlanksRData) {
        await readingFillInTheBlanksRDatabaseSeed(item);
    }

    for (const item of ReadingFillInTheBlanksRWData) {
        await readingFillInTheBlanksRWDatabaseSeed(item);
    }

    for (const item of ReadingMCQMAData) {
        await readingMCQMADatabaseSeed(item);
    }

    for (const item of ReadingMCQSAData) {
        await readingMCQSADataDatabaseSeed(item);
    }

    for (const item of ReadingReorderParagraphData) {
        await readingReorderParagraphDatabaseSeed(item);
    }

    //Listening
    for (const item of HighlightCorrectSummary) {
        await listeningHighlightCorrectSummaryDatabaseSeed(item);
    }

    for (const item of HighlightIncorrectWord) {
        await listeningHighlightIncorrectWordDatabaseSeed(item);
    }

    for (const item of ListeningFillinTheBlanks) {
        await listeningFillInTheBlanksDatabaseSeed(item);
    }

    for (const item of MCQMA) {
        await listeningMCQMADataDatabaseSeed(item);
    }

    for (const item of MCQSA) {
        await listeningMCQSADataDatabaseSeed(item);
    }

    for (const item of SelectMissingWord) {
        await listeningSelectMissingWordDatabaseSeed(item);
    }

    for (const item of SummarizeSpokenText) {
        await listeningSummarizeSpokenTextDatabaseSeed(item);
    }

    for (const item of WriteFromDictation) {
        await listeningWriteFromDictationDatabaseSeed(item);
    }

    //Speaking
    for (const item of AnswerShortQuestions) {
        await SpeakingAnswerShortQuestionDatabaseSeed(item);
    }

    for (const item of DescribeImage) {
        await SpeakingDescribeImageDatabaseSeed(item);
    }

    for (const item of ReadAloud) {
        await SpeakingReadAloudDatabaseSeed(item);
    }

    for (const item of RepeatSentence) {
        await SpeakingRepeatSentenceDatabaseSeed(item);
    }

    for (const item of RetellLecture) {
        await SpeakingRetellLectureDatabaseSeed(item);
    }

    //Writing

    for (const item of SummarizeWrittenText) {
        await WritingSummarizeWrittenTextDatabaseSeed(item);
    }

    for (const item of WriteEssay) {
        await WritingWriteEssayDatabaseSeed(item);
    }

}

main().then(() => {
    console.log('Data seeded successfully');
}
).catch((e) => {
    console.error(e);
}).finally(async () => {
    await prisma.$disconnect();
});

//Working
async function readingFillInTheBlanksRDatabaseSeed(item) {
    await prisma.readingFillInTheBlanksR.upsert({
        create:{
            questionName: 'ReadingFillInTheBlanksR',
            title: item.q_title,
            question: item.question,
            options: item.option,
            correctAnswers: extractAnswersFromHTML(item.question),
            complexity: 1
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Working
async function readingFillInTheBlanksRWDatabaseSeed(item) {
    await prisma.readingFillInTheBlanksRW.upsert({
        create:{
            questionName: 'ReadingFillInTheBlanksRW',
            title: item.q_title,
            question: item.question,
            options: item.option,
            correctAnswers: extractAnswersFromHTML(item.question),
            complexity: 1
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Working
async function readingMCQMADatabaseSeed(item) {
    await prisma.readingMultipleChoiceMultipleAnswers.upsert({
        create:{
            questionName: 'ReadingMultipleChoiceMultipleAnswers',
            title: item.title||"No Title",
            paragraph: item.question,
            question: item.question_mcq,
            options: item.option,
            correctAnswers: [{
                1: 'aim'
            }],
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Working
async function readingMCQSADataDatabaseSeed(item) {
    await prisma.readingMultipleChoiceSingleAnswer.upsert({
        create:{
            questionName: 'ReadingMultipleChoiceSingleAnswer',
            title: item.title, 
            paragraph: item.question,
            question: item.question_mcq,
            options: item.option,
            correctAnswers: [{
                1: 'aim'
            }],
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Working
async function readingReorderParagraphDatabaseSeed(item) {
    await prisma.readingReorderParagraphs.upsert({
        create:{
            questionName: 'ReadingReorderParagraph',
            title: item.q_title || "No Title",
            paragraphs: item.option,
            correctOrder: getOrderFromOptions(item.option),
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}


//Listening

//Working
async function listeningHighlightCorrectSummaryDatabaseSeed(item) {
    await prisma.listeningHighlightCorrectSummary.upsert({
        create:{
            questionName: 'ListeningHighlightCorrectSummary',
            title: item.q_title || "No Title",
            audioUrl: item.media_link,
            audioScript: item.audio_script,
            summaries: item.option || "No Summary",
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Working
async function listeningHighlightIncorrectWordDatabaseSeed(item) {
    await prisma.listeningHighlightIncorrectWords.upsert({
        create:{
            questionName: 'ListeningHighlightIncorrectWord',
            title: item.q_title,
            audioUrl: item.media_link,
            audioScript: item.audio_script || "No Audio Script",
            answer: extractAnswersFromHTML(item.answer),
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}


//Working
async function listeningFillInTheBlanksDatabaseSeed(item) {
    await prisma.listeningFillInTheBlanks.upsert({
        create:{
            questionName: 'ListeningFillInTheBlanks',
            title: item.q_title || "No Title",
            audioUrl: item.media_link,
            audioScript: item.audio_script,
            question: item.question,
            answers: extractAnswersFromHTML(item.question),
            complexity: item.complexity      
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Working
async function listeningMCQMADataDatabaseSeed(item) {
    await prisma.listeningMultipleChoiceMultipleAnswers.upsert({
        create:{
            questionName: 'ListeningMultipleChoiceMultipleAnswers',
            title: item.q_title || "No Title",
            audioUrl: item.media_link,
            audioScript: item.audio_script,
            question: item.question_mcq,
            answers: item.option.filter((option) => option.correct === 1).map((option) => option.options),
            options: item.option,
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Worked upon
async function listeningMCQSADataDatabaseSeed(item) {
    await prisma.listeningMultipleChoiceSingleAnswer.upsert({
        create:{
            questionName: 'ListeningMultipleChoiceSingleAnswer',
            title: item.q_title || "No Title",
            audioUrl: item.media_link,
            audioScript: item.audio_script,
            question: item.question_mcq,
            options: item.option,
            answer: item.option.filter((option) => option.correct === 1).map((option) => option.options),
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Worked upon
async function listeningSelectMissingWordDatabaseSeed(item) {
    await prisma.listeningSelectMissingWord.upsert({
        create:{
            questionName: 'ListeningSelectMissingWord',
            title: item.q_title || "No Title",
            audioUrl: item.media_link,
            audioScript: item.audio_script,
            answer: item.option.filter((option) => option.correct === 1).map((option) => option.options),
            options: item.option,
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Worked upon
async function listeningSummarizeSpokenTextDatabaseSeed(item) {
    await prisma.listeningSummarizeSpokenText.upsert({
        create:{
            questionName: 'ListeningSummarizeSpokenText',
            title: item.q_title || "No Title",
            audioUrl: item.media_link,
            audioScript: item.audio_script,
            answer: item.answer,
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Worked upon
async function listeningWriteFromDictationDatabaseSeed(item) {
    await prisma.listeningWriteFromDictation.upsert({
        create:{
            questionName: 'ListeningWriteFromDictation',
            audioUrl: item.media_link,
            audioScript: item.audio_script
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Worked upon  
async function SpeakingAnswerShortQuestionDatabaseSeed(item) {
    await prisma.speakingAnswerShortQuestion.upsert({
        create:{
            questionName: 'SpeakingAnswerShortQuestion',
            audioUrl: item.media_link,
            audioScript: item.audio_script || "No Audio Script",
            answer: item.answer,
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Worked upon
async function SpeakingDescribeImageDatabaseSeed(item) {
    await prisma.speakingDescribeImage.upsert({
        create:{
            questionName: 'SpeakingDescribeImage',
            title: item.q_title,
            imageUrl: item.media_link,
            answer: item.answer,
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Worked upon
async function SpeakingReadAloudDatabaseSeed(item) {
    await prisma.speakingReadAloud.upsert({
        create:{
            questionName: 'SpeakingReadAloud',
            title: item.q_title,
            question: item.question,
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Worked upon
async function SpeakingRepeatSentenceDatabaseSeed(item) {
    await prisma.speakingRepeatSentence.upsert({
        create:{
            questionName: 'SpeakingRepeatSentence',
            title: item.q_title || "No Title",
            audioUrl: item.media_link,
            audioScript: item.audio_script,
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Worked upon
async function SpeakingRetellLectureDatabaseSeed(item) {
    await prisma.speakingRetellLecture.upsert({
        create:{
            questionName: 'SpeakingRetellLecture',
            title: item.q_title,
            audioUrl: item.media_link,
            audioScript: item.audio_script,
            answer: item.answer,
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Worked upon
async function WritingSummarizeWrittenTextDatabaseSeed(item) {
    await prisma.writingSummarizeWrittenText.upsert({
        create:{
            questionName: 'WritingSummarizeWrittenText',
            title: item.q_title|| "No Title",
            question: item.question,
            answer: item.answer,
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}

//Worked upon
async function WritingWriteEssayDatabaseSeed(item) {
    await prisma.writingWriteEssay.upsert({
        create:{
            questionName: 'WritingWriteEssay',
            title: item.q_title,
            question: item.question,
            answer: item.answer,
            complexity: item.complexity
        },
        update: {},
        where: {
            id: item.id
        },
        });
}
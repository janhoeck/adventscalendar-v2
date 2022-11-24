interface AbstractQuiz {
    question: string;
    variant: 'input' | 'checkbox';
}

export interface InputQuizType extends AbstractQuiz {
    variant: 'input';
    correctAnswer: string;
}

export interface CheckboxQuizType extends AbstractQuiz {
    variant: 'checkbox';
    answers: string[];
    correctAnswerIndex: number;
}

export type QuizType = (InputQuizType | CheckboxQuizType)[];

export default interface CalendarTilesConfiguration {
    day: number;
    text?: string;
    quiz?: QuizType;
}

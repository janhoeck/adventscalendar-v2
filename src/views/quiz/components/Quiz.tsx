import React, { useState, useMemo } from 'react';
import styles from './quiz.module.scss';
import { CheckboxQuizType, InputQuizType, QuizType } from '../../../tools/types/CalendarTileConfiguration';
import { InputQuiz } from './InputQuiz/InputQuiz';
import { CheckboxQuiz } from './CheckboxQuiz/CheckboxQuiz';

export interface QuizProps {
    quiz: QuizType;
    onAllCorrect: () => void;
}

export const Quiz = (props: QuizProps) => {
    const { quiz, onAllCorrect } = props;

    // starting with the first quiz
    const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);

    // The current quiz data
    const currentQuiz = useMemo(() => quiz[currentQuizIndex], [quiz, currentQuizIndex]);
    const hasNextQuiz = useMemo(() => currentQuizIndex < quiz.length - 1, [currentQuizIndex, quiz]);

    const handleCorrect = () => {
        // TODO save into local storage

        if (hasNextQuiz) {
            setCurrentQuizIndex((currentQuizIndex) => currentQuizIndex + 1);
        } else {
            onAllCorrect();
        }
    };

    return (
        <div className={styles.root}>
            <span className={styles.headline}>Erfülle zuerst das Quiz um das Törchen zu öffnen</span>

            <div className={styles.container}>
                <span className={styles.question}>
                    {currentQuizIndex + 1}. {currentQuiz.question}
                </span>
                {currentQuiz.variant === 'input' ? (
                    <InputQuiz key={currentQuiz.question} quiz={currentQuiz as InputQuizType} onCorrect={handleCorrect} />
                ) : (
                    <CheckboxQuiz key={currentQuiz.question} quiz={currentQuiz as CheckboxQuizType} onCorrect={handleCorrect} />
                )}
            </div>
        </div>
    );
};

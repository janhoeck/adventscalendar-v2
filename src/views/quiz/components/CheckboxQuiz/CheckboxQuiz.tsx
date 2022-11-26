import React, { useState } from 'react';
import { ConfirmButton } from '../../../../components/ConfirmButton/ConfirmButton';
import { CheckboxQuizType } from '../../../../tools/types/CalendarTileConfiguration';
import { Checkbox } from './Checkbox';
import styles from './checkboxQuiz.module.scss';

export interface CheckboxQuizProps {
    quiz: CheckboxQuizType;
    onCorrect: (quiz: CheckboxQuizType) => void;
    onIncorrect: () => void;
}

export const CheckboxQuiz: React.VFC<CheckboxQuizProps> = (props) => {
    const { quiz, onCorrect, onIncorrect } = props;
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | undefined>(undefined);

    const handleAnswerChange = (answerIndex: number) => () => {
        setSelectedAnswerIndex(answerIndex);
    };

    const handleConfirmClick = () => {
        const isCorrect = quiz.correctAnswerIndex === selectedAnswerIndex;
        if (!isCorrect) {
            onIncorrect();
            return;
        }

        onCorrect(quiz);
    };

    return (
        <div className={styles.root}>
            <div className={styles.checkboxes}>
                {quiz.answers.map((answer, index) => (
                    <Checkbox
                        key={answer}
                        label={answer}
                        value={answer}
                        checked={selectedAnswerIndex === index}
                        onCheck={handleAnswerChange(index)}
                    />
                ))}
            </div>
            <ConfirmButton onClick={handleConfirmClick}>Weiter</ConfirmButton>
        </div>
    );
};

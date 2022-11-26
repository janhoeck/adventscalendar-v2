import React, { useState } from 'react';
import { ConfirmButton } from '../../../../components/ConfirmButton/ConfirmButton';
import { InputQuizType } from '../../../../tools/types/CalendarTileConfiguration';
import styles from './inputQuiz.module.scss';

export interface InputQuizProps {
    quiz: InputQuizType;
    onCorrect: (quiz: InputQuizType) => void;
    onIncorrect: () => void;
}

export const InputQuiz: React.VFC<InputQuizProps> = (props) => {
    const { quiz, onCorrect, onIncorrect } = props;
    const [value, setValue] = useState<string>('');

    const handleValueChange = (event: React.ChangeEvent<{ value: string }>) => {
        setValue(event.target.value);
    };

    const handleConfirm = () => {
        const isCorrect = quiz.correctAnswer.toLowerCase() === value.toLowerCase();
        if (!isCorrect) {
            onIncorrect();
            return;
        }

        onCorrect(quiz);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleConfirm();
        }
    };

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <input autoFocus value={value} onChange={handleValueChange} onKeyDown={handleKeyDown} />
                <ConfirmButton onClick={handleConfirm}>Weiter</ConfirmButton>
            </div>
        </div>
    );
};

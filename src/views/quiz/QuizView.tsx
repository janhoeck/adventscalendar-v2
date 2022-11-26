import React from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { InnerContent } from '../../components/InnerContent/InnerContent';
import { MainContent } from '../../components/MainContent/MainContent';
import { ViewFooter } from '../../components/ViewFooter/ViewFooter';
import { ViewHeader } from '../../components/ViewHeader/ViewHeader';
import { useQuizContext } from '../../tools/context/QuizContext';
import CalendarTilesConfiguration from '../../tools/types/CalendarTileConfiguration';
import { Quiz } from './components/Quiz';
import styles from './quizView.module.scss';

export interface QuizViewProps {
    item: CalendarTilesConfiguration;
}

export const QuizView = (props: QuizViewProps) => {
    const { item } = props;
    const navigate = useNavigate();
    const { solveQuiz } = useQuizContext();
    const { search } = useLocation();

    const handleFinishQuiz = () => {
        solveQuiz(item.day);
        navigate({ pathname: `/day/${item.day}`, search });
    };

    return (
        <MainContent className={styles.root}>
            <ViewHeader />
            <InnerContent innerClassName={styles.innerContent}>
                <div className={styles.quizContainer}>
                    <Quiz quiz={item?.quiz || []} onAllCorrect={handleFinishQuiz} />
                </div>
            </InnerContent>
            <ViewFooter />
        </MainContent>
    );
};

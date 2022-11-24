import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { CalendarItem } from '../../components/CalendarItem/CalendarItem';
import styles from './dayView.module.scss';
import treeImage from '../../assets/images/tree.png';
import { ViewHeader } from '../../components/ViewHeader/ViewHeader';
import { InnerContent } from '../../components/InnerContent/InnerContent';
import { ViewFooter } from '../../components/ViewFooter/ViewFooter';
import { MainContent } from '../../components/MainContent/MainContent';
import { useQuizContext } from '../../tools/context/QuizContext';
import { ConfirmButton } from '../../components/ConfirmButton/ConfirmButton';
import CalendarTilesConfiguration from '../../tools/types/CalendarTileConfiguration';

export interface DayViewProps {
    item: CalendarTilesConfiguration;
}

export const DayView = (props: DayViewProps) => {
    const { item } = props;
    const { isQuizSolved } = useQuizContext();
    const navigate = useNavigate();
    const { search } = useLocation();

    const hasQiuz = Array.isArray(item.quiz);
    if (hasQiuz && !isQuizSolved(item.day)) {
        return <Navigate replace to={`/day/${item.day}/quiz${search}`} />;
    }

    return (
        <MainContent className={styles.root}>
            <ViewHeader className={styles.viewHeader} />
            <InnerContent>
                <CalendarItem classes={{ root: styles.calenderItem, front: styles.front, back: styles.back }} item={item} />
                <div className={styles.content}>
                    <div className={styles.textContainer}>
                        <span className={styles.text} color='textPrimary'>
                            {item.text}
                        </span>
                        <ConfirmButton onClick={() => navigate({ pathname: '/', search })}>Zurück zum Kalender</ConfirmButton>
                    </div>
                    <img className={styles.image} src={treeImage} alt='Bild' />
                </div>
            </InnerContent>
            <ViewFooter />
        </MainContent>
    );
};

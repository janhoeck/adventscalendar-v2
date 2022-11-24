import React from 'react';
import { useNavigate } from 'react-router';
import { InnerContent } from '../../components/InnerContent/InnerContent';
import { MainContent } from '../../components/MainContent/MainContent';
import { ViewFooter } from '../../components/ViewFooter/ViewFooter';
import { ViewHeader } from '../../components/ViewHeader/ViewHeader';
import styles from './finishQuizView.module.scss';
import partyImage from '../../assets/images/party.png';
import { ConfirmButton } from '../../components/ConfirmButton/ConfirmButton';
import { useLocation } from 'react-router';
import CalendarTilesConfiguration from '../../tools/types/CalendarTileConfiguration';

export interface FinishQuizViewProps {
    item: CalendarTilesConfiguration;
}

export const FinishQuizView = (props: FinishQuizViewProps) => {
    const { item } = props;
    const navigate = useNavigate();
    const { search } = useLocation();

    return (
        <MainContent className={styles.root}>
            <ViewHeader />
            <InnerContent innerClassName={styles.innerContent}>
                <span>Du hast das Quiz geschafft! Dann darfst du nun sehen was sich hinter dem Törchen versteckt.</span>
                <ConfirmButton onClick={() => navigate(`/day/${item.day}${search}`)}>Weiter</ConfirmButton>
                <img src={partyImage} alt='christmas tree' />
            </InnerContent>
            <ViewFooter />
        </MainContent>
    );
};

import React from 'react';
import { InnerContent } from '../../components/InnerContent/InnerContent';
import { MainContent } from '../../components/MainContent/MainContent';
import { ViewFooter } from '../../components/ViewFooter/ViewFooter';
import { ViewHeader } from '../../components/ViewHeader/ViewHeader';
import styles from './notAllowedView.module.scss';
import angryBird from '../../assets/images/angry_bird.png';

export const NotAllowedView = () => {
    return (
        <MainContent className={styles.root}>
            <ViewHeader />
            <InnerContent>
                <h2>Betreten verboten!</h2>
                <span>Du darfst dieses Türchen noch nicht öffnen! Zack zack, zurück mit Dir!</span>
                <img src={angryBird} alt='Angry bird' />
            </InnerContent>
            <ViewFooter />
        </MainContent>
    );
};

import React from 'react';
import clsx from 'clsx';
import styles from './viewHeader.module.scss';

export interface ViewHeaderProps {
    className?: string;
}

export const ViewHeader: React.VFC<ViewHeaderProps> = ({ className }) => {
    return (
        <header className={clsx(styles.root, className)}>
            <span className={styles.headline}>(Adventskalender)</span>
        </header>
    );
};

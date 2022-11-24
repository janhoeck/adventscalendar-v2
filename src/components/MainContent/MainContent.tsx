import clsx from 'clsx';
import React from 'react';
import styles from './mainContent.module.scss';

export type MainContentProps = React.HTMLAttributes<HTMLElement>;

export const MainContent: React.FC<MainContentProps> = ({ children, className, ...restProps }) => {
    return (
        <main className={clsx(styles.root, className)} {...restProps}>
            {children}
        </main>
    );
};

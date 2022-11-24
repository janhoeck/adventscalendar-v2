import clsx from 'clsx';
import React from 'react';
import styles from './innerContent.module.scss';

export interface InnerContentProps {
    className?: string;
    innerClassName?: string;
}

export const InnerContent: React.FC<InnerContentProps> = ({ children, className, innerClassName }) => {
    return (
        <div className={clsx(styles.root, className)}>
            <div className={clsx(styles.inner, innerClassName)}>{children}</div>
        </div>
    );
};

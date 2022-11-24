import clsx from 'clsx';
import React from 'react';
import styles from './confirmButton.module.scss';

export type ConfirmButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export const ConfirmButton: React.FC<ConfirmButtonProps> = (props) => {
    const { children, className, ...restProps } = props;
    return (
        <button className={clsx(styles.root, className)} {...restProps}>
            {children}
        </button>
    );
};

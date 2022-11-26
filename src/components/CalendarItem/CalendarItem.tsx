import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';
import CalendarTilesConfiguration from '../../tools/types/CalendarTileConfiguration';
import { Classes } from '../../tools/types/Classes';
import styles from './calendarItem.module.scss';

export interface CalendarItemProps extends HTMLAttributes<HTMLDivElement> {
    item: CalendarTilesConfiguration;
    variant?: 'closed' | 'open';

    classes?: Classes<'root' | 'content' | 'front' | 'back' | 'text'>;
}

export const CalendarItem = (props: CalendarItemProps) => {
    const { className, classes = {}, item, variant = 'closed', onClick, ...restProps } = props;

    return (
        <div
            className={clsx(styles.root, classes.root, className, {
                [styles.clickable]: typeof onClick === 'function',
                [styles.flip]: variant === 'open',
            })}
            onClick={onClick}
            {...restProps}
        >
            <div className={clsx(styles.content, classes.content)}>
                <div className={clsx(styles.front, classes.front)}>
                    <span className={clsx(styles.text, classes.text)}>{item.day}</span>
                </div>
                <div className={clsx(styles.back, classes.back)}>
                    <span className={clsx(styles.text, classes.text)}>{item.day}</span>
                </div>
            </div>
        </div>
    );
};

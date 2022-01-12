import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { ThemeType } from '../../tools/theme';
import CalendarTilesConfiguration from '../../tools/types/CalendarTileConfiguration';
import ClassesOverride from '../../tools/types/ClassesOverride';
import { CalendarItem } from './CalendarItem';

const useStyles = makeStyles<ThemeType>(
    (theme) => ({
        root: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 200px)',
            alignItems: 'center',
            justifyContent: 'center',
            gridGap: theme.spacing(4),
            [theme.breakpoints.down('sm')]: {
                gridGap: theme.spacing(3),
                gridTemplateColumns: 'repeat(auto-fill, 150px)',
                '& $item': {
                    height: 150,
                    width: 150,
                },
            },
        },
        item: {
            transition: theme.transitions.create(['height', 'width']),
        },
    }),
    { name: 'CalendarItemGrid' }
);

export interface CalendarItemGridProps {
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
    items: CalendarTilesConfiguration[];
    /**
     * The item that was opened
     */
    openItemDay?: number;
    /**
     * All days which got already opened
     */
    alreadyOpenedDays?: number[];
    onItemClick: (item: CalendarTilesConfiguration, event: React.MouseEvent) => void;
}

const DEFAULT_ALREADY_OPENED_DAYS: number[] = [];

export const CalendarItemGrid = (props: CalendarItemGridProps) => {
    const { className, classes: classesProp, items, openItemDay, alreadyOpenedDays = DEFAULT_ALREADY_OPENED_DAYS, onItemClick } = props;
    const classes = useStyles({ ...props, classes: classesProp });

    const handleItemClick = useCallback(
        (item: CalendarTilesConfiguration) => {
            return (event: React.MouseEvent) => onItemClick(item, event);
        },
        [onItemClick]
    );

    return (
        <div className={clsx(classes.root, className)}>
            {items.map((item) => (
                <CalendarItem
                    key={item.day}
                    className={classes.item}
                    variant={openItemDay === item.day ? 'open' : alreadyOpenedDays.includes(item.day) ? 'open_short' : 'closed'}
                    item={item}
                    onClick={handleItemClick(item)}
                />
            ))}
        </div>
    );
};

CalendarItemGrid.displayName = 'CalendarItemGrid';

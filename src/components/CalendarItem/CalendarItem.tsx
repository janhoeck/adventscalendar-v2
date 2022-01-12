import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';
import { ThemeType } from '../../tools/theme';
import CalendarTilesConfiguration from '../../tools/types/CalendarTileConfiguration';
import ClassesOverride from '../../tools/types/ClassesOverride';

const useStyles = makeStyles<ThemeType, CalendarItemProps>(
    (theme) => ({
        root: {
            height: 200,
            width: 200,
            position: 'relative',
            backgroundColor: theme.palette.primary.main,
            boxShadow: `inset 5px 5px 10px 0px ${theme.palette.primary.dark}, inset -5px -5px 10px 0px ${theme.palette.primary.dark}`,
        },
        clickable: {
            cursor: 'pointer',
        },
        inner: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            boxShadow: `5px 5px 0px 0px ${theme.palette.primary.dark}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformOrigin: 'left',
            transition: theme.transitions.create('all'),
            '&::after': {
                content: '""',
                position: 'absolute',
                width: 'calc(100% - 10px)',
                height: 'calc(100% - 10px)',
                border: `1px dashed ${theme.palette.primary.dark}`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            },
        },
        day: {
            color: theme.palette.text.primary,
            fontSize: '4em',
            fontFamily: 'CartoonBlocksChristmas',
        },
        open_short: {
            transform: 'perspective(1200px) translateZ(0px) translateX(0px) translateY(0px) rotateY(-35deg)',
        },
        open: {
            transform: 'perspective(1200px) translateZ(0px) translateX(0px) translateY(0px) rotateY(-105deg)',
        },
    }),
    { name: 'CalendarItem' }
);

export interface CalendarItemProps extends HTMLAttributes<HTMLDivElement> {
    classes?: ClassesOverride<typeof useStyles>;
    item: CalendarTilesConfiguration;
    variant?: 'closed' | 'open_short' | 'open';
}

export const CalendarItem = (props: CalendarItemProps) => {
    const { className, classes: classesProp, item, variant = 'closed', onClick, ...restProps } = props;
    const classes = useStyles({ ...props, classes: classesProp });
    return (
        <div className={clsx(classes.root, className, { [classes.clickable]: typeof onClick === 'function' })} onClick={onClick} {...restProps}>
            <div className={clsx(classes.inner, classes[variant])}>
                <Typography className={classes.day}>{item.day}</Typography>
            </div>
        </div>
    );
};

CalendarItem.displayName = 'CalendarItem';

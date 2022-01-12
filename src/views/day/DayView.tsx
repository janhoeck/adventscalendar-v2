import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import qs from 'qs';
import React from 'react';
import { useLocation, useParams } from 'react-router';
import { findItemByDay } from '../../assets/configuration/calendarTilesConfiguration';
import { CalendarItem } from '../../components/CalendarItem/CalendarItem';
import { ThemeType } from '../../tools/theme';
import ClassesOverride from '../../tools/types/ClassesOverride';
import { AdventsCalendarUtilInstance } from '../../tools/utils/AdventsCalendarUtil';

const useStyles = makeStyles<ThemeType>(
    (theme) => ({
        root: {},
        header: {
            width: '100%',
            height: 150,
        },
        content: {
            marginTop: theme.spacing(4),
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gridGap: theme.spacing(2),
        },
        image: {
            width: '100%',
            maxWidth: 350,
            margin: '0 auto',
        },
        text: {
            whiteSpace: 'pre-line',
            fontFamily: 'RobotoThin',
        },
    }),
    { name: 'DayView' }
);

export interface DayViewProps {
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
}

const DayView = (props: DayViewProps) => {
    const { className, classes: classesProp } = props;
    const classes = useStyles({ ...props, classes: classesProp });
    const { day } = useParams<{ day: string }>();
    const location = useLocation();

    const item = findItemByDay(Number(day));

    if (typeof item === 'undefined') {
        console.error("Can't find a item by the day", day);
        return null;
    }

    const parsedQueryParams = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (!parsedQueryParams.admin && !AdventsCalendarUtilInstance.canAccessDay(item.day)) {
        console.error('You are not allowed to see this page yet.');
        return null;
    }

    return (
        <div className={clsx(classes.root, className)}>
            <CalendarItem className={classes.header} item={item} />
            <div className={classes.content}>
                <Typography className={classes.text} color='textPrimary'>
                    {item.text}
                </Typography>
                {item.image && <img className={classes.image} src={item.image} alt='Bild' />}
            </div>
        </div>
    );
};

DayView.displayName = 'DayView';
export default DayView;

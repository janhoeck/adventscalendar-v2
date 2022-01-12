import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { HTMLAttributes, useCallback, useMemo, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { calendarTilesConfiguration } from '../../assets/configuration/calendarTilesConfiguration';
import { CalendarItemGrid } from '../../components/CalendarItem/CalendarItemGrid';
import { ThemeType } from '../../tools/theme';
import CalendarTilesConfiguration from '../../tools/types/CalendarTileConfiguration';
import ClassesOverride from '../../tools/types/ClassesOverride';
import { AdventsCalendarUtilInstance } from '../../tools/utils/AdventsCalendarUtil';
import qs from 'qs';
import { useItemDatabase } from './tools/useItemDatabase';

const items = calendarTilesConfiguration;

const useStyles = makeStyles<ThemeType>(
    () => ({
        root: {},
    }),
    { name: 'CalendarView' }
);

export interface CalendarViewProps extends HTMLAttributes<HTMLDivElement> {
    classes?: ClassesOverride<typeof useStyles>;
}

export const CalendarView = (props: CalendarViewProps) => {
    const { className, classes: classesProp, ...restProps } = props;
    const classes = useStyles({ ...props, classes: classesProp });
    const history = useHistory();
    const location = useLocation();
    const { openedDays, saveOpenedDay } = useItemDatabase();

    const [openItemDay, setOpenItemDay] = useState<number | undefined>(undefined);
    const timeoutId = useRef<NodeJS.Timeout>();

    const handleItemClick = useCallback(
        (item: CalendarTilesConfiguration) => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }

            const parsedQueryParams = qs.parse(location.search, { ignoreQueryPrefix: true });
            if (!parsedQueryParams.admin && !AdventsCalendarUtilInstance.canAccessDay(item.day)) {
                console.error('You cannot redirect to that page, yet');
                return;
            }

            setOpenItemDay(item.day);
            timeoutId.current = setTimeout(() => {
                saveOpenedDay(item.day);

                setOpenItemDay(undefined);
                // redirect to the day view
                history.push({
                    pathname: `/day/${item.day}`,
                    search: location.search,
                });
            }, 1500);
        },
        [history, location, saveOpenedDay]
    );

    const shuffledItems = useMemo(() => items.sort(() => 0.5 - Math.random()), []);

    return (
        <div className={clsx(classes.root, className)} {...restProps}>
            <CalendarItemGrid items={shuffledItems} alreadyOpenedDays={openedDays} openItemDay={openItemDay} onItemClick={handleItemClick} />
        </div>
    );
};

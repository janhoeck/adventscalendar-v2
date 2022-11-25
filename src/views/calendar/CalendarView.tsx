import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { calendarTilesConfiguration } from '../../assets/configuration/calendarTilesConfiguration';
import { CalendarItemGrid } from '../../components/CalendarItem/CalendarItemGrid';
import CalendarTilesConfiguration from '../../tools/types/CalendarTileConfiguration';
import { ADMIN_QUERY_PARAM, canAccessDay } from '../../tools/utils/AdventsCalendarUtil';
import qs from 'qs';
import { useCurrentDate } from '../../tools/useCurrentDate';
import { ViewHeader } from '../../components/ViewHeader/ViewHeader';
import { InnerContent } from '../../components/InnerContent/InnerContent';
import { ViewFooter } from '../../components/ViewFooter/ViewFooter';
import { MainContent } from '../../components/MainContent/MainContent';
import styles from './calenderView.module.scss';
import { useItemDatabase } from '../../tools/context/ItemsDatabaseContext';

const items = calendarTilesConfiguration;

export const CalendarView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { openedDays, checkOpened, saveOpenedDay } = useItemDatabase();
    const currentDate = useCurrentDate();

    const [openItemDay, setOpenItemDay] = useState<{ day: number; canOpen: boolean } | undefined>(undefined);
    const timeoutId = useRef<NodeJS.Timeout>();

    const handleItemClick = useCallback(
        (item: CalendarTilesConfiguration) => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }

            const parsedQueryParams = qs.parse(location.search, { ignoreQueryPrefix: true });
            if (!parsedQueryParams[ADMIN_QUERY_PARAM] && !canAccessDay(currentDate, item.day)) {
                setOpenItemDay({ day: item.day, canOpen: false });
                console.error('You cannot redirect to that page, yet');
                return;
            }

            // If this day was already opened, we directly redirect.
            if (checkOpened(item.day)) {
                // redirect to the day view
                navigate({ pathname: `/day/${item.day}`, search: location.search });
                return;
            }

            setOpenItemDay({ day: item.day, canOpen: true });
            timeoutId.current = setTimeout(() => {
                saveOpenedDay(item.day);

                setOpenItemDay(undefined);
                // redirect to the day view
                navigate({ pathname: `/day/${item.day}`, search: location.search });
            }, 1500);
        },
        [checkOpened, currentDate, navigate, location, saveOpenedDay]
    );

    return (
        <MainContent className={styles.root}>
            <ViewHeader />
            <InnerContent>
                <CalendarItemGrid items={items} alreadyOpenedDays={openedDays} openItemDay={openItemDay} onItemClick={handleItemClick} />
            </InnerContent>
            <ViewFooter />
        </MainContent>
    );
};

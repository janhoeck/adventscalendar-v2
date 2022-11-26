import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { calendarTilesConfiguration } from '../../assets/configuration/calendarTilesConfiguration';
import { CalendarItemGrid, CalendarItemGridRef } from '../../components/CalendarItem/CalendarItemGrid';
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

    const timeoutId = useRef<NodeJS.Timeout>();

    const calendarItemGridRef = useRef<CalendarItemGridRef>(null);

    const handleItemClick = (item: CalendarTilesConfiguration) => {
        const { current: api } = calendarItemGridRef;
        if (!api) {
            return;
        }

        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        const parsedQueryParams = qs.parse(location.search, { ignoreQueryPrefix: true });
        if (!parsedQueryParams[ADMIN_QUERY_PARAM] && !canAccessDay(currentDate, item.day)) {
            api.shakeItem(item);
            console.error('You cannot redirect to that page, yet');
            return;
        }

        // If this day was already opened, we directly redirect.
        if (checkOpened(item.day)) {
            // redirect to the day view
            navigate({ pathname: `/day/${item.day}`, search: location.search });
            return;
        }

        timeoutId.current = setTimeout(() => {
            timeoutId.current = undefined;

            saveOpenedDay(item.day);
            // redirect to the day view
            navigate({ pathname: `/day/${item.day}`, search: location.search });
        }, 750);
    };

    return (
        <MainContent className={styles.root}>
            <ViewHeader />
            <InnerContent>
                <CalendarItemGrid ref={calendarItemGridRef} items={items} alreadyOpenedDays={openedDays} onItemClick={handleItemClick} />
            </InnerContent>
            <ViewFooter />
        </MainContent>
    );
};

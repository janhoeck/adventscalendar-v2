import qs from 'qs';
import React from 'react';
import { useLocation } from 'react-router';
import { Navigate, useParams } from 'react-router';
import { findItemByDay } from '../assets/configuration/calendarTilesConfiguration';
import CalendarTilesConfiguration from '../tools/types/CalendarTileConfiguration';
import { useCurrentDate } from '../tools/useCurrentDate';
import { ADMIN_QUERY_PARAM, canAccessDay } from '../tools/utils/AdventsCalendarUtil';

export interface ProtectedRouteProps {
    children: (item: CalendarTilesConfiguration) => React.ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { day } = useParams<{ day: string }>();
    const item = findItemByDay(Number(day));
    const currentDate = useCurrentDate();
    const location = useLocation();

    if (typeof item === 'undefined') {
        console.error("Can't find a item by the day", day);
        return <Navigate replace to='/' />;
    }

    const parsedQueryParams = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (!parsedQueryParams[ADMIN_QUERY_PARAM] && !canAccessDay(currentDate, item.day)) {
        console.error('You are not allowed to see this page yet.');
        return <Navigate replace to='/not-allowed' />;
    }

    return children(item);
};

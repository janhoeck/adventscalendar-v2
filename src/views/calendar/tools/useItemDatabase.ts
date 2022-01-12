import { useCallback, useEffect, useState } from 'react';

const KEY = 'adventscalendar:opened_items';

export const useItemDatabase = () => {
    const [openedDays, setOpenedDays] = useState<number[]>([]);

    useEffect(() => {
        setOpenedDays(() => {
            const data = localStorage.getItem(KEY);
            if (!data) {
                return [];
            }

            return JSON.parse(data);
        });
    }, []);

    const saveOpenedDay = useCallback((day: number) => {
        setOpenedDays((openedDays) => {
            const uniqueItems = new Set([...openedDays]);
            uniqueItems.add(day);

            localStorage.setItem(KEY, JSON.stringify(Array.from(uniqueItems)));
            return Array.from(uniqueItems);
        });
    }, []);

    const deleteOpenedDay = useCallback((day: number) => {
        setOpenedDays((openedDays) => {
            const openedDaysCopy = [...openedDays];
            const index = openedDaysCopy.findIndex((item) => item === day);
            if (index === -1) {
                return openedDays;
            }

            openedDaysCopy.splice(index, 1);
            localStorage.setItem(KEY, JSON.stringify(openedDaysCopy));
            return openedDaysCopy;
        });
    }, []);

    const checkOpened = useCallback(
        (day: number) => {
            return openedDays.includes(day);
        },
        [openedDays]
    );

    return {
        openedDays,
        checkOpened,
        saveOpenedDay,
        deleteOpenedDay,
    };
};

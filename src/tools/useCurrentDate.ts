import { useEffect, useState } from 'react';

interface Response {
    datetime: string;
}

const fetchCurrentDate = async (): Promise<Date | undefined> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://worldtimeapi.org/api/timezone/Europe/Berlin');
            const responseTime = (await response.json()) as Response;
            return resolve(new Date(responseTime.datetime));
        } catch (error) {
            console.error(error);
        }
        reject(undefined);
    });
};

/**
 * Fetches the current date from the world time api
 */
export const useCurrentDate = () => {
    const [date, setDate] = useState<Date | undefined>();

    useEffect(() => {
        fetchCurrentDate()
            .then((date) => setDate(date))
            .catch(() => setDate(undefined));

        const intervalId = setInterval(async () => {
            setDate(await fetchCurrentDate());
        }, 20000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return date;
};

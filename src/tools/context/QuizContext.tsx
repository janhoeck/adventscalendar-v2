import React, { useState, useEffect, useContext } from 'react';

const KEY = 'adventscalendar:solved_quiz';
const QuizContext = React.createContext<ReturnType<typeof useStore>>({} as any);

const useStore = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [solvedQuizByDay, setSolvedQuizByDay] = useState<number[]>([]);

    const isQuizSolved = (day: number) => {
        return solvedQuizByDay.includes(day);
    };

    const solveQuiz = (day: number) => {
        setSolvedQuizByDay((solvedQuizByDay) => {
            const solvedQuizByDayCopy = [...solvedQuizByDay];
            solvedQuizByDayCopy.push(day);

            const uniqueSolvedQuizByDay = new Set<number>(solvedQuizByDayCopy);
            localStorage.setItem(KEY, JSON.stringify(Array.from(uniqueSolvedQuizByDay)));

            return Array.from(uniqueSolvedQuizByDay);
        });
    };

    useEffect(() => {
        setLoading(true);
        const data = localStorage.getItem(KEY);
        if (!data) {
            setSolvedQuizByDay([]);
            setLoading(false);
            return;
        }

        setSolvedQuizByDay([...(JSON.parse(data) as number[])]);
        setLoading(false);
    }, []);

    return {
        isLoading,
        isQuizSolved,
        solveQuiz,
    };
};

export const QuizContextProvider: React.FC = ({ children }) => {
    const store = useStore();
    return <QuizContext.Provider value={store}>{!store.isLoading ? children : null}</QuizContext.Provider>;
};

export const useQuizContext = () => {
    return useContext(QuizContext);
};

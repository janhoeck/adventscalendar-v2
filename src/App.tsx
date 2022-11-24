import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ItemsDatabaseContextProvider } from './tools/context/ItemsDatabaseContext';
import { QuizContextProvider } from './tools/context/QuizContext';
import { CalendarView } from './views/calendar/CalendarView';
import { DayView } from './views/day/DayView';
import { NotAllowedView } from './views/notAllowed/NotAllowedView';
import { FinishQuizView } from './views/quiz/FinishQuizView';
import { QuizView } from './views/quiz/QuizView';

export const App = () => {
    return (
        <ItemsDatabaseContextProvider>
            <QuizContextProvider>
                <Routes>
                    <Route path='/' element={<CalendarView />} />
                    <Route path='/day/:day/*' element={<ProtectedRoute>{(item) => <DayView item={item} />}</ProtectedRoute>} />
                    <Route path='/day/:day/quiz/*' element={<ProtectedRoute>{(item) => <QuizView item={item} />}</ProtectedRoute>} />
                    <Route path='/day/:day/quiz/finish/*' element={<ProtectedRoute>{(item) => <FinishQuizView item={item} />}</ProtectedRoute>} />
                    <Route path='not-allowed' element={<NotAllowedView />} />
                </Routes>
            </QuizContextProvider>
        </ItemsDatabaseContextProvider>
    );
};

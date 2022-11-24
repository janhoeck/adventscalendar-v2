import React, { useCallback, useMemo } from 'react';
import CalendarTilesConfiguration from '../../tools/types/CalendarTileConfiguration';
import { CalendarItem } from './CalendarItem';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export interface CalendarItemGridProps {
    className?: string;
    items: CalendarTilesConfiguration[];
    /**
     * The item that was opened
     */
    openItemDay?: { day: number; canOpen: boolean };
    /**
     * All days which got already opened
     */
    alreadyOpenedDays?: number[];
    onItemClick: (item: CalendarTilesConfiguration, event: React.MouseEvent) => void;
}

const DEFAULT_ALREADY_OPENED_DAYS: number[] = [];
const HEIGHTS = [125, 150, 175, 200, 225, 250];

export const CalendarItemGrid = (props: CalendarItemGridProps) => {
    const { className, items, openItemDay, alreadyOpenedDays = DEFAULT_ALREADY_OPENED_DAYS, onItemClick } = props;

    const handleItemClick = useCallback(
        (item: CalendarTilesConfiguration) => {
            return (event: React.MouseEvent) => onItemClick(item, event);
        },
        [onItemClick]
    );

    const heights = useMemo(() => {
        return items.map(() => HEIGHTS[Math.floor(Math.random() * HEIGHTS.length)]);
    }, [items]);

    return (
        <div className={className}>
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
                <Masonry gutter='24px'>
                    {items.map((item, index) => (
                        <CalendarItem
                            shake={openItemDay?.day === item.day && !openItemDay?.canOpen}
                            style={{ height: `${heights[index]}px` }}
                            key={item.day}
                            variant={
                                openItemDay?.day === item.day && openItemDay?.canOpen
                                    ? 'open'
                                    : alreadyOpenedDays.includes(item.day)
                                    ? 'open'
                                    : 'closed'
                            }
                            item={item}
                            onClick={handleItemClick(item)}
                        />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
};

CalendarItemGrid.displayName = 'CalendarItemGrid';

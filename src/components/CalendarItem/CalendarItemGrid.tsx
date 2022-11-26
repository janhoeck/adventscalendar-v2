import React, { useCallback, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import CalendarTilesConfiguration from '../../tools/types/CalendarTileConfiguration';
import { CalendarItem } from './CalendarItem';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Shaker, ShakerRef } from '../Shaker/Shaker';

export interface CalendarItemGridProps {
    className?: string;
    items: CalendarTilesConfiguration[];
    /**
     * All days which got already opened
     */
    alreadyOpenedDays?: number[];
    onItemClick: (item: CalendarTilesConfiguration, event: React.MouseEvent) => void;
}

export interface CalendarItemGridRef {
    shakeItem: (item: CalendarTilesConfiguration) => void;
}

const DEFAULT_ALREADY_OPENED_DAYS: number[] = [];
const HEIGHTS = [125, 175];

export const CalendarItemGrid = forwardRef<CalendarItemGridRef, CalendarItemGridProps>((props, ref) => {
    const { className, items, alreadyOpenedDays = DEFAULT_ALREADY_OPENED_DAYS, onItemClick } = props;
    const itemRefs = useRef<{ [day: number]: { item: CalendarTilesConfiguration; ref: ShakerRef } }>([]);

    const handleItemClick = useCallback(
        (item: CalendarTilesConfiguration) => {
            return (event: React.MouseEvent) => onItemClick(item, event);
        },
        [onItemClick]
    );

    const handleRegisterRef = (ref: ShakerRef) => {
        if (!ref) {
            return;
        }

        const { item } = ref;
        itemRefs.current[item.day] = { item: item, ref: ref };
    };

    useImperativeHandle(ref, () => ({
        shakeItem: (item: CalendarTilesConfiguration) => {
            const itemRef = itemRefs.current[item.day];
            if (!itemRef) {
                return;
            }

            itemRef.ref.shake();
        },
    }));

    const heights = useMemo(() => {
        return items.map((_, index) => HEIGHTS[index % 3 === 0 ? 0 : 1]);
    }, [items]);

    return (
        <div className={className}>
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
                <Masonry gutter='24px'>
                    {items.map((item, index) => (
                        <Shaker<CalendarTilesConfiguration> key={item.day} item={item} ref={handleRegisterRef}>
                            <CalendarItem
                                style={{ height: `${heights[index]}px` }}
                                variant={alreadyOpenedDays.includes(item.day) ? 'open' : 'closed'}
                                item={item}
                                onClick={handleItemClick(item)}
                            />
                        </Shaker>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
});

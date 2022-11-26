import clsx from 'clsx';
import React, { forwardRef, useImperativeHandle, useRef, useState, Ref } from 'react';
import styles from './shaker.module.scss';

export interface ShakerProps<T = any> {
    item?: T;
    children: React.ReactElement;
}

export interface ShakerRef<T = any> {
    item?: T;
    shake: () => void;
}

function ShakerWithRef<T = any>(props: ShakerProps<T>, ref: Ref<ShakerRef<T>>) {
    const { children, item } = props;

    const [shakeRunning, setShakeRunning] = useState<boolean>(false);
    const timeoutId = useRef<NodeJS.Timeout>();

    useImperativeHandle(
        ref,
        () =>
            ({
                item: item,
                shake: () => {
                    if (timeoutId.current) {
                        // clear the current running timeout if there is still a current running one
                        clearTimeout(timeoutId.current);
                    }

                    setShakeRunning(true);
                    timeoutId.current = setTimeout(() => {
                        timeoutId.current = undefined;
                        setShakeRunning(false);
                    }, 820); // 820, because the shake css keyframe animation is 820ms long
                },
            } as ShakerRef)
    );

    return <div className={clsx({ [styles.shake]: shakeRunning })}>{children}</div>;
}

export const Shaker = forwardRef(ShakerWithRef) as <T extends any>(p: ShakerProps<T> & { ref?: Ref<ShakerRef<T>> }) => React.ReactElement;

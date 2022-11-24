import React from 'react';
import styles from './checkbox.module.scss';

export interface CheckboxProps {
    label: string;
    value: string;
    checked: boolean;
    onCheck: () => void;
}

export const Checkbox: React.VFC<CheckboxProps> = (props) => {
    const { value, label, checked, onCheck } = props;
    return (
        <div className={styles.root}>
            <input type='checkbox' value={value} checked={checked} onChange={onCheck} />
            <span>{label}</span>
        </div>
    );
};

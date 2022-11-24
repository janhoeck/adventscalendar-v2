import moment from 'moment';

export const ADMIN_QUERY_PARAM = 'jan_is_only_admin';

export const canAccessDay = (currentDate: Date | undefined, day: number): boolean => {
    if (!currentDate) {
        return false;
    }

    const currentDateMoment = moment(currentDate);
    // Open a door is just allowed in december (zero based)
    if (currentDateMoment.month() !== 11) {
        return false;
    }

    // This calendar just has 24 doors to open
    if (day > 24) {
        return false;
    }

    return day <= currentDateMoment.date();
};

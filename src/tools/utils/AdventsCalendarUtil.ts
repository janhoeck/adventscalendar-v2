import moment from 'moment';

class AdventsCalendarUtil {
    /**
     * Checks if a current day is allowed to open
     */
    canAccessDay = (day: number): boolean => {
        const currentDate = moment();

        // Open a door is just allowed in december (zero based)
        if (currentDate.month() !== 11) {
            return false;
        }

        // This calendar just has 24 doors to open
        if (day > 24) {
            return false;
        }

        return day <= currentDate.date();
    };
}

export const AdventsCalendarUtilInstance = new AdventsCalendarUtil();

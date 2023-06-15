import moment from 'moment-timezone';

export const DATE_FORMAT = {
    DATETIME_GENERAL: 'YYYY, MMMM Do, h:mm:ss a',
    DATETIME_COUNTDOWN: 'YYYY-MM-DD HH:mm',
    DATETIME_YY_MM_DD: 'YYYY-MM-DD',
};

export const formatDateTime = (serverDatetime: any, format: string) => {
    return moment.tz(serverDatetime, 'Asia/Dhaka').format(format);
};

export const daysBetweenDates = (startDate: Date, endDate: Date = new Date()) => {
    return moment(endDate).diff(startDate, 'days');
};

export const getStartOfCurrentDate = (date: Date) => {
    let currentDate = null;

    if (!date) currentDate = new Date();
    else currentDate = new Date(date);

    currentDate.setHours(0, 0, 0, 0);

    return currentDate;
};

export const getEndOfCurrentDate = (date: Date) => {
    let currentDate = null;

    if (!date) currentDate = new Date();
    else currentDate = new Date(date);

    currentDate.setHours(23, 59, 59, 999);

    return currentDate;
};

export const isSameDate = (date1: Date, date2: Date) => {
    const formattedDate1 = moment.tz(date1, 'Asia/Dhaka').format('YYYY-MM-DD').split('-')[2];

    const formattedDate2 = moment.tz(date2, 'Asia/Dhaka').format('YYYY-MM-DD').split('-')[2];

    return formattedDate1 === formattedDate2;
};

export const getFormattedCurrentDatetime = (format: string) => moment().tz('Asia/Dhaka').format(format);

export const isDateExpired = (date: Date) => {
    var dateToCompare = moment(date);
    var now = moment();

    if (now > dateToCompare) {
        return true;
    } else {
        return false;
    }
};

export const isDateLess = (then: Date, now: Date) => {
    var before = moment(then);
    var after = moment(now);

    console.log('isDateLess');

    if (after < before) return true;

    return false;
};

export const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);

    return result;
};

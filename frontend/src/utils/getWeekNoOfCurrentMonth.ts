function getWeekNumberOfCurrentMonth(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysOffset = firstDayOfMonth.getDay();
    const weekNumber = Math.floor((date.getDate() + daysOffset) / 7);
    return weekNumber;
}

export default getWeekNumberOfCurrentMonth;

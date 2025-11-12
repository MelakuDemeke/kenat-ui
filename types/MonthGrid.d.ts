interface MonthGridData {
    headers: any;
    days: any[];
    year: any;
    month: any;
    monthName: any;
    up: () => {
        headers: any;
        days: any[];
        year: any;
        month: any;
        monthName: any;
        up: /*elided*/ any;
        down: () => /*elided*/ any;
    };
    down: () => {
        headers: any;
        days: any[];
        year: any;
        month: any;
        monthName: any;
        up: () => /*elided*/ any;
        down: /*elided*/ any;
    };
}

/**
 * A headless hook for generating a configurable Ethiopian calendar grid.
 * @param {object} [options={}] - Configuration options.
 * @param {number} [options.year] - The initial Ethiopian year. Defaults to the current year.
 * @param {number} [options.month] - The initial Ethiopian month. Defaults to the current month.
 * @param {boolean} [options.useGeez=false] - Whether to use Ge'ez numerals for display.
 * @param {number} [options.weekStart=1] - The starting day of the week (0 for Sunday, 1 for Monday).
 * @param {string} [options.weekdayLang='amharic'] - The language for weekday names ('amharic' or 'english').
 * @param {string[]|null} [options.holidayFilter=null] - An array of HolidayTags to filter by.
 */
export function useMonthGrid(options?: {
    year?: number | undefined;
    month?: number | undefined;
    useGeez?: boolean | undefined;
    weekStart?: number | undefined;
    weekdayLang?: string | undefined;
    holidayFilter?: string[] | null | undefined;
}): {
    grid: null | MonthGridData;
    controls: {
        goNext: () => void;
        goPrev: () => void;
    };
    state: {
        year: any;
        month: any;
        useGeez: any;
        weekStart: any;
        weekdayLang: any;
        holidayFilter: any;
    };
};

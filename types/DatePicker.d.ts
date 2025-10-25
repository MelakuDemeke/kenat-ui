/**
 * A headless hook for building a configurable Ethiopian date picker.
 * @param {object} [options={}] - Configuration options.
 * @param {object} [options.initialDate] - The initially selected Ethiopian date object { year, month, day }.
 * @param {string} [options.weekdayLang='amharic'] - The language for weekday names ('amharic' or 'english').
 * @param {boolean} [options.useGeez=false] - Whether to use Ge'ez numerals for display.
 * @param {number} [options.weekStart=1] - The starting day of the week (0 for Sunday, 1 for Monday).
 * @param {function} [options.onDateSelect] - A callback function that receives the selected date object.
 */
export function useDatePicker(options?: {
    initialDate?: object | undefined;
    weekdayLang?: string | undefined;
    useGeez?: boolean | undefined;
    weekStart?: number | undefined;
    onDateSelect?: Function | undefined;
}): {
    state: {
        selectedDate: any;
        formatted: string;
        open: boolean;
        grid: null;
        headers: any;
        days: any;
        inputRef: import("react").RefObject<null>;
    };
    actions: {
        toggleOpen: () => void;
        close: () => void;
        selectDate: (day: any) => void;
        nextMonth: () => void;
        prevMonth: () => void;
        nextYear: () => void;
        prevYear: () => void;
    };
};

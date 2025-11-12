/**
 * A headless hook for two-way date conversion between Ethiopian (EC) and Gregorian (GC) calendars.
 * @param {object} [initialDate] - Optional initial date.
 * @param {object} [initialDate.ec] - Initial Ethiopian date, e.g., { year: 2016, month: 10, day: 7 }.
 * @param {object} [initialDate.gc] - Initial Gregorian date, e.g., { year: 2024, month: 6, day: 13 }.
 */
export function useDateConverter(initialDate?: {
    ec?: object | undefined;
    gc?: object | undefined;
}): {
    state: {
        ecDate: object | null;
        gcDate: object | null;
        convertedEc: null;
        convertedGc: null;
    };
    actions: {
        setEcDate: import("react").Dispatch<import("react").SetStateAction<object | null>>;
        setGcDate: import("react").Dispatch<import("react").SetStateAction<object | null>>;
    };
};

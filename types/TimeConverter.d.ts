/**
 * A headless hook for converting between Gregorian (24-hour) and Ethiopian time.
 * @param {object} [initialTime] - Optional initial time.
 * @param {object} [initialTime.gregorian] - Initial Gregorian time, e.g., { hour: 14, minute: 30 }.
 * @param {object} [initialTime.ethiopian] - Initial Ethiopian time, e.g., { hour: 8, minute: 30, period: 'day' }.
 */
export function useTimeConverter(initialTime?: {
    gregorian?: object | undefined;
    ethiopian?: object | undefined;
}): {
    state: {
        ethiopian: any;
        gregorian: any;
    };
    actions: {
        setGregorianTime: (hour: any, minute: any) => void;
        setEthiopianTime: (hour: any, minute: any, period: any) => void;
    };
};

/**
 * A headless hook that provides real-time Ethiopian and Gregorian time, updating every second.
 */
export function useEthiopianClock(): {
    now: Date;
    ethiopianTime: any;
    gregorianTime: {
        hour: number;
        minute: number;
        second: number;
    };
};

import { useState, useCallback } from 'react';
import { Time } from 'kenat';

/**
 * A headless hook for converting between Gregorian (24-hour) and Ethiopian time.
 * @param {object} [initialTime] - Optional initial time.
 * @param {object} [initialTime.gregorian] - Initial Gregorian time, e.g., { hour: 14, minute: 30 }.
 * @param {object} [initialTime.ethiopian] - Initial Ethiopian time, e.g., { hour: 8, minute: 30, period: 'day' }.
 */
export function useTimeConverter(initialTime) {
  const getInitialState = () => {
    if (initialTime?.ethiopian) {
      const ethTime = new Time(initialTime.ethiopian.hour, initialTime.ethiopian.minute, initialTime.ethiopian.period);
      return { ethiopian: ethTime, gregorian: ethTime.toGregorian() };
    }
    if (initialTime?.gregorian) {
      const ethTime = Time.fromGregorian(initialTime.gregorian.hour, initialTime.gregorian.minute);
      return { ethiopian: ethTime, gregorian: initialTime.gregorian };
    }
    // Default to the current time
    const now = new Date();
    const currentEthTime = Time.fromGregorian(now.getHours(), now.getMinutes());
    return { ethiopian: currentEthTime, gregorian: { hour: now.getHours(), minute: now.getMinutes() } };
  };

  const [ethiopian, setEthiopian] = useState(getInitialState().ethiopian);
  const [gregorian, setGregorian] = useState(getInitialState().gregorian);

  const setGregorianTime = useCallback((hour, minute) => {
    const newHour = isNaN(hour) ? 0 : Math.max(0, Math.min(23, hour));
    const newMinute = isNaN(minute) ? 0 : Math.max(0, Math.min(59, minute));
    
    setGregorian({ hour: newHour, minute: newMinute });
    setEthiopian(Time.fromGregorian(newHour, newMinute));
  }, []);

  const setEthiopianTime = useCallback((hour, minute, period) => {
    const newHour = isNaN(hour) ? 1 : Math.max(1, Math.min(12, hour));
    const newMinute = isNaN(minute) ? 0 : Math.max(0, Math.min(59, minute));
    
    const newEthTime = new Time(newHour, newMinute, period);
    setEthiopian(newEthTime);
    setGregorian(newEthTime.toGregorian());
  }, []);

  return {
    state: {
      ethiopian,
      gregorian,
    },
    actions: {
      setGregorianTime,
      setEthiopianTime,
    },
  };
}
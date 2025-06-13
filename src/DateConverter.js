import { useState, useEffect } from 'react';
import { toEC, toGC } from 'kenat';

/**
 * A headless hook for two-way date conversion between Ethiopian (EC) and Gregorian (GC) calendars.
 * @param {object} [initialDate] - Optional initial date.
 * @param {object} [initialDate.ec] - Initial Ethiopian date, e.g., { year: 2016, month: 10, day: 7 }.
 * @param {object} [initialDate.gc] - Initial Gregorian date, e.g., { year: 2024, month: 6, day: 13 }.
 */
export function useDateConverter(initialDate) {
  const getInitialState = () => {
    if (initialDate?.ec) {
      return { ec: initialDate.ec, gc: null }; // GC will be calculated
    }
    if (initialDate?.gc) {
      return { ec: null, gc: initialDate.gc }; // EC will be calculated
    }
    // Default to the current date
    const now = new Date();
    const gcNow = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    return { ec: null, gc: gcNow };
  };

  const [ecDate, setEcDate] = useState(getInitialState().ec);
  const [gcDate, setGcDate] = useState(getInitialState().gc);

  // State to hold the conversion results or errors
  const [convertedGc, setConvertedGc] = useState(null);
  const [convertedEc, setConvertedEc] = useState(null);

  // Effect to convert from EC to GC
  useEffect(() => {
    if (!ecDate) return;
    try {
      const result = toGC(ecDate.year, ecDate.month, ecDate.day);
      setConvertedGc(`${result.year}/${result.month}/${result.day}`);
    } catch (err) {
      setConvertedGc(`❌ ${err.message || 'Invalid EC date'}`);
    }
  }, [ecDate]);

  // Effect to convert from GC to EC
  useEffect(() => {
    if (!gcDate) return;
    try {
      const result = toEC(gcDate.year, gcDate.month, gcDate.day);
      // If ecDate was initially null, set it on first successful conversion
      if (!ecDate) {
          setEcDate(result);
      }
      setConvertedEc(`${result.year}/${result.month}/${result.day}`);
    } catch (err) {
      setConvertedEc(`❌ ${err.message || 'Invalid GC date'}`);
    }
  }, [gcDate]);

  return {
    state: {
      ecDate,
      gcDate,
      convertedEc,
      convertedGc,
    },
    actions: {
      setEcDate,
      setGcDate,
    },
  };
}
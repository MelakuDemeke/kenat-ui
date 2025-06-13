import { useState, useEffect } from 'react';
import { Time } from 'kenat';

/**
 * A headless hook that provides real-time Ethiopian and Gregorian time, updating every second.
 */
export function useEthiopianClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once

  const ethiopianTime = Time.fromGregorian(now.getHours(), now.getMinutes());
  
  const gregorianTime = {
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds(),
  };

  return {
    now, // The raw Date object, useful for analog clocks
    ethiopianTime, // The kenat Time instance
    gregorianTime, // A simple gregorian time object
  };
}
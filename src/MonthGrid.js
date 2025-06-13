import { useState, useEffect, useCallback } from 'react';
import { MonthGrid as KenatMonthGrid } from 'kenat';

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
export function useMonthGrid(options = {}) {
  const {
    year,
    month,
    useGeez = false,
    weekStart = 1,
    weekdayLang = 'amharic',
    holidayFilter = null,
  } = options;

  const [instance, setInstance] = useState(null);
  const [data, setData] = useState(null);

  // Effect to initialize or update the MonthGrid instance
  useEffect(() => {
    const grid = new KenatMonthGrid({ year, month, useGeez, weekStart, weekdayLang, holidayFilter });
    setInstance(grid);
    setData(grid.generate());
  }, [year, month, useGeez, weekStart, weekdayLang, holidayFilter]); // Re-create instance if any option changes

  // Action to go to the next month
  const goNext = useCallback(() => {
    if (!instance) return;
    setData(instance.up().generate());
  }, [instance]);

  // Action to go to the previous month
  const goPrev = useCallback(() => {
    if (!instance) return;
    setData(instance.down().generate());
  }, [instance]);

  return {
    grid: data,
    controls: {
      goNext,
      goPrev,
    },
    // Expose the current state of the grid instance
    state: {
      year: instance?.year,
      month: instance?.month,
      useGeez: instance?.useGeez,
      weekStart: instance?.weekStart,
      weekdayLang: instance?.weekdayLang,
      holidayFilter: instance?.holidayFilter,
    },
  };
}
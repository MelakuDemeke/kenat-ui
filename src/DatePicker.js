import { useEffect, useRef, useState, useCallback } from 'react';
import Kenat, { MonthGrid } from 'kenat';

/**
 * A headless hook for building a configurable Ethiopian date picker.
 * @param {object} [options={}] - Configuration options.
 * @param {object} [options.initialDate] - The initially selected Ethiopian date object { year, month, day }.
 * @param {string} [options.weekdayLang='amharic'] - The language for weekday names ('amharic' or 'english').
 * @param {boolean} [options.useGeez=false] - Whether to use Ge'ez numerals for display.
 * @param {number} [options.weekStart=1] - The starting day of the week (0 for Sunday, 1 for Monday).
 * @param {function} [options.onDateSelect] - A callback function that receives the selected date object.
 */
export function useDatePicker(options = {}) {
    const {
        initialDate,
        weekdayLang: initialWeekdayLang = 'amharic',
        useGeez: initialUseGeez = false,
        weekStart: initialWeekStart = 1,
        onDateSelect,
    } = options;

    const [instance, setInstance] = useState(null);
    const [grid, setGrid] = useState(null);
    const [selectedDate, setSelectedDate] = useState(() => initialDate || Kenat.now().getEthiopian());
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);

    // Effect to initialize the MonthGrid instance
    useEffect(() => {
        const { year, month } = selectedDate;
        const m = new MonthGrid({
            year,
            month,
            weekdayLang: initialWeekdayLang,
            useGeez: initialUseGeez,
            weekStart: initialWeekStart,
        });
        setInstance(m);
        setGrid(m.generate());
    }, [initialDate, initialWeekdayLang, initialUseGeez, initialWeekStart]); // Re-create instance if initial options change

    const updateGrid = useCallback(() => {
        if (instance) {
            setGrid(instance.generate());
        }
    }, [instance]);

    // Effect to navigate the grid when the selectedDate changes from outside
    useEffect(() => {
        if (instance && selectedDate) {
            instance.year = selectedDate.year;
            instance.month = selectedDate.month;
            updateGrid();
        }
    }, [selectedDate, instance, updateGrid]);


    const selectDate = (day) => {
        if (!day || !day.ethiopian) return;
        setSelectedDate(day.ethiopian); // Set the raw numeric date
        onDateSelect?.(day.ethiopian); // Call the optional callback
        setOpen(false);
    };

    const navigate = (action) => {
        if (!instance) return;
        switch (action) {
            case 'nextMonth': instance.up(); break;
            case 'prevMonth': instance.down(); break;
            case 'nextYear': instance.year++; break;
            case 'prevYear': instance.year--; break;
            default: break;
        }
        updateGrid();
    };

    const formatDate = (date) => {
        if (!date) return "";
        return `${date.year}/${String(date.month).padStart(2, "0")}/${String(
            date.day
        ).padStart(2, "0")}`;
    };

    return {
        state: {
            selectedDate,
            formatted: formatDate(selectedDate),
            open,
            grid,
            headers: grid?.headers ?? [],
            days: grid?.days ?? [],
            inputRef,
        },
        actions: {
            toggleOpen: () => setOpen((o) => !o),
            close: () => setOpen(false),
            selectDate,
            nextMonth: () => navigate('nextMonth'),
            prevMonth: () => navigate('prevMonth'),
            nextYear: () => navigate('nextYear'),
            prevYear: () => navigate('prevYear'),
        },
    };
}
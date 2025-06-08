import { useEffect, useRef, useState, useCallback } from 'react'
import Kenat, { MonthGrid } from 'kenat'

export function useDatePicker() {
    const [instance, setInstance] = useState(null)
    const [grid, setGrid] = useState(null)
    const [selectedDate, setSelectedDate] = useState(() => Kenat.now().getEthiopian())
    const [open, setOpen] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        const { year, month } = selectedDate
        const m = new MonthGrid({ year, month, weekdayLang: 'amharic' })
        setInstance(m)
        setGrid(m.generate())
    }, [])

    const updateGrid = useCallback(() => {
        if (instance) setGrid(instance.generate())
    }, [instance])

    const nextMonth = () => {
        instance?.up()
        updateGrid()
    }

    const prevMonth = () => {
        instance?.down()
        updateGrid()
    }

    const nextYear = () => {
        if (instance) {
            instance.year++
            updateGrid()
        }
    }

    const prevYear = () => {
        if (instance) {
            instance.year--
            updateGrid()
        }
    }

    const selectDate = (day) => {
        setSelectedDate(day.ethiopian)
        setOpen(false)
    }

    const formatDate = (date) => {
        if (!date) return ''
        return `${date.year}/${String(date.month).padStart(2, '0')}/${String(date.day).padStart(2, '0')}`
    }

    return {
        state: {
            selectedDate,
            formatted: formatDate(selectedDate),
            open,
            grid,
            headers: grid?.headers ?? [],
            days: grid?.days ?? [],
            inputRef
        },
        actions: {
            toggleOpen: () => setOpen((o) => !o),
            close: () => setOpen(false),
            selectDate,
            nextMonth,
            prevMonth,
            nextYear,
            prevYear
        }
    }
}

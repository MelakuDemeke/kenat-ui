import { useState, useEffect, useCallback } from 'react'
import { MonthGrid as KenatMonthGrid } from 'kenat'

export function useMonthGrid(options = {}) {
  const {
    year,
    month,
    useGeez = false,
    weekStart = 1,
    weekdayLang = 'amharic'
  } = options

  const [instance, setInstance] = useState(null)
  const [data, setData] = useState(null)

  // Initialize
  useEffect(() => {
    const grid = new KenatMonthGrid({ year, month, useGeez, weekStart, weekdayLang })
    setInstance(grid)
    setData(grid.generate())
  }, [year, month, useGeez, weekStart, weekdayLang])

  const rerender = useCallback((overrides = {}) => {
    if (!instance) return

    const updated = new KenatMonthGrid({
      year: instance.year,
      month: instance.month,
      useGeez: overrides.useGeez ?? instance.useGeez,
      weekStart: overrides.weekStart ?? instance.weekStart,
      weekdayLang: overrides.weekdayLang ?? instance.weekdayLang,
    })

    setInstance(updated)
    setData(updated.generate())
  }, [instance])

  const goNext = useCallback(() => {
    if (!instance) return
    setData(instance.up().generate())
  }, [instance])

  const goPrev = useCallback(() => {
    if (!instance) return
    setData(instance.down().generate())
  }, [instance])

  return {
    grid: data,
    controls: {
      rerender,
      goNext,
      goPrev,
    },
    state: {
      useGeez: instance?.useGeez,
      weekStart: instance?.weekStart,
      weekdayLang: instance?.weekdayLang,
      year: instance?.year,
      month: instance?.month
    }
  }
}
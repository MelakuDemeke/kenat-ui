# kenat-ui

[](https://www.google.com/search?q=https://www.npmjs.com/package/kenat-ui)
[](https://opensource.org/licenses/MIT)

Headless UI hooks for building Ethiopian calendar components in React, powered by the [kenat](https://www.npmjs.com/package/kenat) core library.

`kenat-ui` gives you complete control over your UI while handling all the complex logic for you.It provides hooks for state management and business logic but leaves the markup and styling entirely up to you.

## 💡 Why Headless UI?

A headless UI library is ideal when you want:

  * **Full Design Control**: Integrate with any design system or styling solution like Tailwind CSS, Chakra UI, or custom CSS. 
  * **Maximum Flexibility**: Build any kind of Ethiopian calendar UI, from date pickers to interactive grids, without being locked into a specific look and feel.
  * **Reusability**: Create a consistent logic base that can be used across different themes, applications, or component libraries. 

## 🚀 Installation

To get started, install `kenat-ui` from npm. The core `kenat` library is a dependency and will be installed alongside it.

```bash
npm install kenat-ui
```

## ✨ Available Hooks

`kenat-ui` provides a suite of hooks to cover all your Ethiopian calendar needs:

  * `useMonthGrid`: Generates a fully-interactive Ethiopian calendar grid, ready to be rendered.
  * `useDatePicker`: Handles all the logic for a dropdown Ethiopian date picker, including selection and navigation.
  * `useTimeConverter`: Manages state for two-way conversion between Gregorian (24h) and Ethiopian (day/night) time.
  * `useDateConverter`: Manages state for two-way conversion between Gregorian and Ethiopian calendar dates, with built-in error handling.
  * `useEthiopianClock`: Provides real-time, ticking Ethiopian time data to power live digital or analog clocks.

## Usage Example

Here’s how you can use `useMonthGrid` to build a simple, interactive calendar view.

```jsx
import React, { useState } from 'react';
import { useMonthGrid } from 'kenat-ui';
import { HolidayTags } from 'kenat';

function MyCalendar() {
  const [options, setOptions] = useState({
    year: 2016, // E.C.
    month: 1,   // Meskerem
    holidayFilter: [HolidayTags.PUBLIC],
  });

  const { grid, controls } = useMonthGrid(options);

  if (!grid) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={controls.goPrev}>&lt; Prev</button>
        <h3>{grid.monthName} {grid.year}</h3>
        <button onClick={controls.goNext}>Next &gt;</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
        {grid.headers.map((h) => <div key={h} style={{ fontWeight: 'bold' }}>{h.slice(0, 3)}</div>)}
        {grid.days.map((day, i) => {
          if (!day) return <div key={i} />;
          
          const isHoliday = day.holidays.length > 0;
          const style = {
            padding: '10px',
            border: '1px solid #eee',
            background: isHoliday ? '#e6f7ff' : 'white',
          };

          return (
            <div key={i} style={style}>
              {day.ethiopian.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

## API Overview: `useDatePicker`

All hooks follow a similar pattern, returning `state` and `actions` objects.

```javascript
import { useDatePicker } from 'kenat-ui'

const { state, actions } = useDatePicker();
```

  * **`state` object**:

      * `selectedDate`: The currently selected Ethiopian date object `{ year, month, day }`.
      * `formatted`: The selected date as a `"YYYY/MM/DD"` string. 
      * `open`: A boolean indicating if the calendar dropdown is open. 
      * `grid`: The full month grid object for the current view.
      * `inputRef`: A React ref to attach to your input field. 

  * **`actions` object**:

      * `toggleOpen()`: Toggles the visibility of the calendar dropdown. 
      * `close()`: Closes the dropdown. 
      * `selectDate(day)`: Sets the selected date based on a day object from the grid. 
      * `nextMonth()`, `prevMonth()`: Navigates the calendar.
      * `nextYear()`, `prevYear()`: Navigates the calendar by year.

## License

This project is licensed under the MIT License. 
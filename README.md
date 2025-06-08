
# Kenat UI
## 🧠 Headless UI Hooks

`kenat-ui` provides composable, framework-agnostic logic for building Ethiopian calendar interfaces. You can plug these into any design system (Tailwind, Chakra, Shadcn, etc.).

---

### 🔹 `useMonthGrid()`

Generates an Ethiopian month calendar grid with full control over formatting, geez numerals, week start, and navigation.

#### Usage

```js
import { useMonthGrid } from 'kenat-ui'

const { grid, controls, state } = useMonthGrid()
```

#### Returns

* `grid`: The current month data `{ year, monthName, headers, days }`
* `controls`: Functions:

  * `goNext()` — go to next month
  * `goPrev()` — go to previous month
  * `rerender(overrides)` — change options like `useGeez`, `weekStart`, or `weekdayLang`
* `state`: Internal state values like:

  * `useGeez`, `weekdayLang`, `weekStart`, `year`, `month`

#### Example

```js
const { grid, controls } = useMonthGrid()

return (
  <>
    <h2>{grid.monthName} {grid.year}</h2>
    <button onClick={controls.goPrev}>Prev</button>
    <button onClick={controls.goNext}>Next</button>
    <div>{grid.headers.join(' ')}</div>
    <div>{grid.days.map(day => day?.ethiopian.day)}</div>
  </>
)
```

---

### 🔹 `useDatePicker()`

Build a fully customizable Ethiopian date picker. You get all the state, logic, and navigation control — no UI is imposed.

#### Usage

```js
import { useDatePicker } from 'kenat-ui'

const { state, actions } = useDatePicker()
```

#### `state`

* `selectedDate`: `{ year, month, day }` – the picked Ethiopian date
* `formatted`: `"YYYY/MM/DD"` – zero-padded formatted string
* `grid`: full month grid
* `headers`: weekday headers
* `days`: calendar day objects
* `open`: whether the picker is visible
* `inputRef`: ref to your input for DOM focus/behavior

#### `actions`

* `toggleOpen()`, `close()`
* `selectDate(day)`
* `nextMonth()`, `prevMonth()`
* `nextYear()`, `prevYear()`

#### Example

```js
const { state, actions } = useDatePicker()

return (
  <div>
    <input
      readOnly
      value={state.formatted}
      onClick={actions.toggleOpen}
    />
    {state.open && (
      <div>
        <div>{state.grid.monthName} {state.grid.year}</div>
        <button onClick={actions.prevMonth}>←</button>
        <button onClick={actions.nextMonth}>→</button>
        <div>
          {state.days.map(day => (
            <button key={day?.id} onClick={() => actions.selectDate(day)}>
              {day?.ethiopian.day}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
)
```

---

## 💡 Why Headless?

These hooks give you:

* 🧩 Full **logic and calendar data**
* 💅 Zero styling or opinionated markup
* 🧘‍♂️ Freedom to style as Shadcn UI, Chakra, Tailwind, etc.

Ideal for design systems, date pickers, calendar widgets, and custom mobile inputs.

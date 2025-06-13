import React from 'react';
import { useDatePicker } from '../DatePicker';

const DatePickerHarness = (options) => {
  const { state, actions } = useDatePicker(options);

  const isSelected = (day) => {
    if (!day || !state.selectedDate || !day.ethiopian.day) return false;
    const d = day.ethiopian;
    const s = state.selectedDate;
    // Check if the date state is valid before comparing
    if (typeof s.year !== 'number' || typeof s.month !== 'number' || typeof s.day !== 'number') return false;
    return d.year === s.year && d.month === s.month && d.day === s.day;
  };

  // Basic styles for the demo
  const styles = {
    container: { fontFamily: 'sans-serif', maxWidth: '350px', border: '1px solid #eee', padding: '1rem', borderRadius: '8px' },
    input: { width: '100%', padding: '8px', fontSize: '1rem', cursor: 'pointer', boxSizing: 'border-box' },
    dropdown: { marginTop: '8px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginTop: '10px' },
    day: { padding: '8px', border: '1px solid #eee', textAlign: 'center', cursor: 'pointer', background: 'white' },
    selectedDay: { backgroundColor: '#3399ff', color: 'white', border: '1px solid #3399ff' },
    weekdayHeader: { fontWeight: 'bold', textAlign: 'center', fontSize: '0.9em' },
    error: { marginTop: '10px', padding: '10px', background: '#ffdddd', border: '1px solid #ff0000', color: '#ff0000', borderRadius: '4px'}
  };
  
  const isStateInvalid = typeof state.selectedDate?.day !== 'number';

  return (
    <div style={styles.container}>
      <p>Selected Date: <strong>{isStateInvalid ? 'INVALID' : state.formatted}</strong></p>
      {isStateInvalid && (
        <div style={styles.error}>
          <strong>Error:</strong> The selected date state is broken. This is the expected failure in Ge'ez mode.
        </div>
      )}
      
      <input type="text" readOnly value={state.formatted} onClick={actions.toggleOpen} style={styles.input} />

      {state.open && state.grid && (
        <div style={styles.dropdown}>
          <div style={styles.header}>
            <button onClick={actions.prevYear}>&lt;&lt;</button>
            <button onClick={actions.prevMonth}>&lt;</button>
            <span>{state.grid.monthName} {state.grid.year}</span>
            <button onClick={actions.nextMonth}>&gt;</button>
            <button onClick={actions.nextYear}>&gt;&gt;</button>
          </div>

          <div style={styles.grid}>
            {state.headers.map((h) => <div key={h} style={styles.weekdayHeader}>{h.slice(0, 2)}</div>)}
            {state.days.map((day, i) =>
              day ? (
                <button key={i} onClick={() => actions.selectDate(day)} style={{ ...styles.day, ...(isSelected(day) && styles.selectedDay) }}>
                  {day.ethiopian.day}
                </button>
              ) : <div key={i} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};


// Storybook metadata
export default {
  title: 'Hooks/useDatePicker',
  component: DatePickerHarness,
};

// --- STORIES ---

export const Default = {
  args: {},
  parameters: { docs: { description: { story: 'Default functionality with standard Arabic numerals.' }}},
};

export const WithGeez = {
  args: { useGeez: true },
  parameters: { docs: { description: { story: 'This story tests `useGeez: true`. **Note:** Selecting a date in this mode is expected to fail because the published `kenat` library returns non-numeric string values, which breaks the state.' }}},
};

export const WithInitialDate = {
  args: { initialDate: { year: 2016, month: 10, day: 7 } },
  parameters: { docs: { description: { story: 'Tests the picker with a pre-selected initial date.' }}},
};
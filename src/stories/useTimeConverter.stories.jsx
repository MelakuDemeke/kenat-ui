import React, { useState } from 'react';
import { useTimeConverter } from '../TimeConverter';

// A harness component to render the hook's UI
const TimeConverterHarness = (initialTime) => {
  const { state, actions } = useTimeConverter(initialTime);
  const [useGeez, setUseGeez] = useState(false);

  // Adjusted styles for a more compact look
  const styles = {
    container: { fontFamily: 'sans-serif', maxWidth: '550px', border: '1px solid #eee', padding: '1.25rem', borderRadius: '8px', margin: 'auto' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
    column: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    inputContainer: { display: 'flex', gap: '0.5rem', alignItems: 'center' },
    input: { width: '100%', padding: '8px', fontSize: '1rem', textAlign: 'center', fontFamily: 'monospace', border: '1px solid #ccc', borderRadius: '6px' },
    select: { padding: '8px', fontSize: '1rem', fontFamily: 'monospace', border: '1px solid #ccc', borderRadius: '6px' },
    result: { marginTop: '0.5rem', fontFamily: 'monospace', fontSize: '1rem', padding: '0.75rem', background: '#f5faff', borderRadius: '6px', border: '1px solid #e1e9f0', color: '#005a9e' },
    title: { margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' }
  };

  const gregorianHour = String(state.gregorian.hour).padStart(2, '0');
  const gregorianMinute = String(state.gregorian.minute).padStart(2, '0');

  return (
    <div style={styles.container}>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" checked={useGeez} onChange={() => setUseGeez(g => !g)} />
          Use Ge'ez Numerals
        </label>
      </div>

      <div style={styles.grid}>
        {/* Gregorian Side */}
        <div style={styles.column}>
          <h4 style={styles.title}>Gregorian Time (24h)</h4>
          <div style={styles.inputContainer}>
            <input type="number" style={styles.input} value={gregorianHour} onChange={(e) => actions.setGregorianTime(parseInt(e.target.value), state.gregorian.minute)} />
            <span>:</span>
            <input type="number" style={styles.input} value={gregorianMinute} onChange={(e) => actions.setGregorianTime(state.gregorian.hour, parseInt(e.target.value))} />
          </div>
          <div style={styles.result}>
            → Converts to: <strong>{state.ethiopian.format({ useGeez })}</strong>
          </div>
        </div>

        {/* Ethiopian Side */}
        <div style={styles.column}>
          <h4 style={styles.title}>Ethiopian Time</h4>
          <div style={styles.inputContainer}>
            <input type="number" style={styles.input} value={state.ethiopian.hour} onChange={(e) => actions.setEthiopianTime(parseInt(e.target.value), state.ethiopian.minute, state.ethiopian.period)} />
            <span>:</span>
            <input type="number" style={styles.input} value={String(state.ethiopian.minute).padStart(2, '0')} onChange={(e) => actions.setEthiopianTime(state.ethiopian.hour, parseInt(e.target.value), state.ethiopian.period)} />
            <select style={styles.select} value={state.ethiopian.period} onChange={(e) => actions.setEthiopianTime(state.ethiopian.hour, state.ethiopian.minute, e.target.value)}>
              <option value="day">day</option>
              <option value="night">night</option>
            </select>
          </div>
          <div style={styles.result}>
            → Converts to: <strong>{gregorianHour}:{gregorianMinute}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

// Storybook metadata
export default {
  title: 'Hooks/useTimeConverter',
  component: TimeConverterHarness,
};

// --- STORIES ---
export const Default = {
  args: {},
  parameters: { docs: { description: { story: 'Initializes with the current time.' }}},
};

export const WithInitialTime = {
  args: {
    initialTime: { gregorian: { hour: 20, minute: 15 } } // 8:15 PM
  },
  parameters: { docs: { description: { story: 'Initializes with a specific Gregorian time.' }}},
};
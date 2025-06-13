// src/stories/useDateConverter.stories.jsx
import React from 'react';
import { useDateConverter } from '../DateConverter';

// Harness component to render the hook's UI
const DateConverterHarness = (initialDate) => {
  const { state, actions } = useDateConverter(initialDate);

  const handleEcChange = (part, value) => {
    const numValue = parseInt(value || '0');
    actions.setEcDate({ ...state.ecDate, [part]: numValue });
  };

  const handleGcChange = (part, value) => {
    const numValue = parseInt(value || '0');
    actions.setGcDate({ ...state.gcDate, [part]: numValue });
  };

  // Styles
  const styles = {
    container: { fontFamily: 'sans-serif', maxWidth: '600px', border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    converter: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    inputGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' },
    input: { padding: '8px', fontSize: '1rem', textAlign: 'center', fontFamily: 'monospace', border: '1px solid #ccc', borderRadius: '6px' },
    result: { marginTop: '0.5rem', fontFamily: 'monospace', fontSize: '1rem', padding: '0.75rem', background: '#f5faff', borderRadius: '6px', border: '1px solid #e1e9f0' },
    title: { margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' },
  };
  
  // Render loading state if dates are not ready
  if (!state.ecDate || !state.gcDate) {
      return <div>Loading...</div>
  }

  return (
    <div style={styles.container}>
      {/* EC to GC Converter */}
      <div style={styles.converter}>
        <h4 style={styles.title}>Ethiopian Date (EC)</h4>
        <div style={styles.inputGrid}>
          <input type="number" style={styles.input} value={state.ecDate.year} onChange={(e) => handleEcChange('year', e.target.value)} placeholder="Year" />
          <input type="number" style={styles.input} value={state.ecDate.month} onChange={(e) => handleEcChange('month', e.target.value)} placeholder="Month" />
          <input type="number" style={styles.input} value={state.ecDate.day} onChange={(e) => handleEcChange('day', e.target.value)} placeholder="Day" />
        </div>
        <div style={styles.result}>→ GC: <strong style={{color: state.convertedGc?.startsWith('❌') ? 'red' : '#005a9e'}}>{state.convertedGc}</strong></div>
      </div>

      {/* GC to EC Converter */}
      <div style={styles.converter}>
        <h4 style={styles.title}>Gregorian Date (GC)</h4>
        <div style={styles.inputGrid}>
          <input type="number" style={styles.input} value={state.gcDate.year} onChange={(e) => handleGcChange('year', e.target.value)} placeholder="Year" />
          <input type="number" style={styles.input} value={state.gcDate.month} onChange={(e) => handleGcChange('month', e.target.value)} placeholder="Month" />
          <input type="number" style={styles.input} value={state.gcDate.day} onChange={(e) => handleGcChange('day', e.target.value)} placeholder="Day" />
        </div>
        <div style={styles.result}>→ EC: <strong style={{color: state.convertedEc?.startsWith('❌') ? 'red' : '#005a9e'}}>{state.convertedEc}</strong></div>
      </div>
    </div>
  );
};

// Storybook metadata
export default {
  title: 'Hooks/useDateConverter',
  component: DateConverterHarness,
};

// --- STORIES ---
export const Default = {
  args: {},
  parameters: { docs: { description: { story: 'Initializes with the current date.' }}},
};

export const WithInvalidDate = {
    args: {
      initialDate: { ec: { year: 2016, month: 14, day: 1 } }
    },
    parameters: { docs: { description: { story: 'Demonstrates the error handling by initializing with an invalid EC date.' }}},
  };
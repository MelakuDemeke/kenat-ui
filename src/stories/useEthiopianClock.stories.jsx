import React, { useState } from 'react';
import { useEthiopianClock } from '../Clock';
import { toGeez } from 'kenat';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

// The harness component is now flexible based on props
const ClockHarness = ({ showDigital = false, showAnalog = false }) => {
  const { now, ethiopianTime, gregorianTime } = useEthiopianClock();
  const [useGeez, setUseGeez] = useState(true);

  const formatNum = (num) => (useGeez ? toGeez(num) : String(num).padStart(2, '0'));

  const styles = {
    container: { fontFamily: 'sans-serif', maxWidth: '350px', border: '1px solid #eee', padding: '2rem', borderRadius: '8px', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' },
    digitalClock: { fontFamily: 'monospace', fontSize: '3rem' },
    period: { fontSize: '1.25rem' },
    analogContainer: { position: 'relative', width: '220px', height: '220px' },
    analogLabel: { position: 'absolute', transform: 'translate(-50%, -50%)', fontSize: '1.1rem', fontWeight: 'bold' },
    reactClockWrapper: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
  };

  return (
    <div style={styles.container}>
      {/* Conditionally render the Digital Clock */}
      {showDigital && (
        <div>
          <div style={styles.digitalClock}>
            {formatNum(ethiopianTime.hour)}:{formatNum(ethiopianTime.minute)}:{formatNum(gregorianTime.second)}
          </div>
          <div style={styles.period} align="center">
            {ethiopianTime.period} ({useGeez ? 'ግዕዝ' : 'Arabic'})
          </div>
        </div>
      )}

      {/* Conditionally render the Analog Clock */}
      {showAnalog && (
        <div style={styles.analogContainer}>
          {[...Array(12)].map((_, i) => {
            const angle = ((i + 1) / 12) * 2 * Math.PI;
            const radius = 95;
            const x = 110 + radius * Math.sin(angle);
            const y = 110 - radius * Math.cos(angle);
            return (
              <div key={i} style={{ ...styles.analogLabel, left: `${x}px`, top: `${y}px` }}>
                {useGeez ? toGeez(i + 1) : i + 1}
              </div>
            );
          })}
          <div style={styles.reactClockWrapper}>
            <Clock value={now} renderNumbers={false} size={220} />
          </div>
        </div>
      )}

      {/* Toggle Control is always visible for convenience */}
      <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input type="checkbox" checked={useGeez} onChange={() => setUseGeez(g => !g)} />
        Use Ge'ez Numerals
      </label>
    </div>
  );
};


// Storybook metadata
export default {
  title: 'Hooks/useEthiopianClock',
  component: ClockHarness,
};

// --- STORIES ---

// Story for only the Digital Clock
export const DigitalClock = {
  args: {
    showDigital: true,
    showAnalog: false,
  },
  parameters: {
    docs: { description: { story: 'Demonstrates using the hook to power a digital Ethiopian clock.' } },
  },
};

// Story for only the Analog Clock
export const AnalogClock = {
  args: {
    showDigital: false,
    showAnalog: true,
  },
  parameters: {
    docs: { description: { story: 'Demonstrates using the hook to power an analog clock with Ethiopian numerals.' } },
  },
};

// Story showing both together
export const CombinedDisplay = {
  name: 'Combined Display (Digital & Analog)',
  args: {
    showDigital: true,
    showAnalog: true,
  },
  parameters: {
    docs: { description: { story: 'A complete example showing both clock types powered by the same hook.' } },
  },
};
import React, { useState, useEffect } from 'react';
import { useMonthGrid } from '../MonthGrid';
import { HolidayTags, monthNames } from 'kenat';

// Modal component remains the same
const Modal = ({ content, onClose }) => {
    const modalStyle = {
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: 'rgba(0, 0, 0, 0.6)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 100
    };
    const contentStyle = {
        background: 'white', padding: '2rem', borderRadius: '8px',
        maxWidth: '500px', width: '90%'
    };
    return (
        <div style={modalStyle} onClick={onClose}>
        <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
            {content}
            <button onClick={onClose} style={{ width: '100%', marginTop: '1rem', padding: '10px' }}>Close</button>
        </div>
        </div>
    );
};


const MonthGridHarness = (initialOptions) => {
  const [options, setOptions] = useState(initialOptions);
  const [modalData, setModalData] = useState(null);
  
  const [yearInput, setYearInput] = useState(initialOptions.year.toString());
  const [yearError, setYearError] = useState('');

  const { grid, controls } = useMonthGrid(options);

  useEffect(() => {
    if (grid?.year) {
      setYearInput(grid.year.toString());
      setYearError('');
    }
  }, [grid?.year]);


  const handleDayClick = (day) => {
    if (!day) return;
    if (day.holidays.length > 0) {
      setModalData({ type: 'holiday', data: day.holidays[0] });
    } else {
      setModalData({ type: 'date', data: day });
    }
  };

  const renderModalContent = () => {
    if (!modalData) return null;
    if (modalData.type === 'holiday') {
        const { name, description } = modalData.data;
        return ( <div> <h3 style={{ marginTop: 0 }}>{name}</h3> <p>{description}</p> </div> );
    }
    if (modalData.type === 'date') {
        const { ethiopian, gregorian } = modalData.data;
        const ethiopianDateStr = `${grid.monthName} ${ethiopian.day}, ${ethiopian.year}`;
        const gregorianDateStr = `${gregorian.day}/${gregorian.month}/${gregorian.year}`;
        return ( <div> <h3 style={{ marginTop: 0 }}>Date Details</h3> <p><strong>Ethiopian:</strong> {ethiopianDateStr}</p> <p><strong>Gregorian:</strong> {gregorianDateStr}</p> </div> );
    }
  };

  // --- Updated Year Handler with Stricter Validation ---
  const handleYearChange = (e) => {
    const newYearStr = e.target.value;
    setYearInput(newYearStr);
    
    const newYearNum = parseInt(newYearStr);
    // Let's enforce a safe modern range to avoid the bug in the underlying library
    if (!isNaN(newYearNum) && newYearNum >= 1900 && newYearNum <= 2200) {
      setOptions(prev => ({ ...prev, year: newYearNum }));
      setYearError('');
    } else {
      // Don't update the options if the year is outside the safe range
      setYearError('Year must be between 1900 and 2200');
    }
  };
  
  const handleMonthChange = (e) => setOptions(prev => ({ ...prev, month: parseInt(e.target.value) }));
  const handleToggleGeez = () => setOptions(prev => ({ ...prev, useGeez: !prev.useGeez }));
  const handleToggleLang = () => setOptions(prev => ({ ...prev, weekdayLang: prev.weekdayLang === 'amharic' ? 'english' : 'amharic' }));
  const handleFilterChange = (tag) => {
    setOptions(prev => {
      const currentFilter = prev.holidayFilter || [];
      const newFilter = currentFilter.includes(tag) ? currentFilter.filter(t => t !== tag) : [...currentFilter, tag];
      return { ...prev, holidayFilter: newFilter.length > 0 ? newFilter : null };
    });
  };

  // Styles
  const styles = {
    container: { fontFamily: 'sans-serif', maxWidth: '600px', border: '1px solid #eee', padding: '1rem', borderRadius: '8px' },
    controls: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
    options: { display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px', marginBottom: '1rem', alignItems: 'center' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' },
    day: { padding: '10px 5px', border: '1px solid #eee', textAlign: 'center', background: 'white', cursor: 'pointer' },
    holiday: { background: '#e6f7ff', border: '1px solid #91d5ff' },
    today: { background: '#dff0d8', border: '1px solid #3c763d', fontWeight: 'bold'},
    header: { fontWeight: 'bold', textAlign: 'center' },
    selector: { padding: '8px', border: '1px solid #ccc', borderRadius: '4px' },
    error: { color: 'red', fontSize: '0.8rem', marginLeft: '0.5rem' },
    inputError: { border: '1px solid red' }
  };
  
  if (!grid) return <div>Loading...</div>;
  
  const amharicMonthNames = monthNames.amharic;

  return (
    <div style={styles.container}>
      {modalData && <Modal content={renderModalContent()} onClose={() => setModalData(null)} />}
      <div style={styles.controls}>
        <button onClick={controls.goPrev}>&lt; Prev Month</button>
        <h3 style={{ margin: 0 }}>{grid.monthName} {grid.year}</h3>
        <button onClick={controls.goNext}>Next Month &gt;</button>
      </div>
      <div style={styles.options}>
        <div>
          <label>Year: </label>
          <input type="number" value={yearInput} onChange={handleYearChange} style={{...styles.selector, ...(yearError && styles.inputError)}} />
          {yearError && <span style={styles.error}>{yearError}</span>}
        </div>
        <div>
          <label>Month: </label>
          <select value={options.month} onChange={handleMonthChange} style={styles.selector}>
            {amharicMonthNames.map((name, index) => ( <option key={name} value={index + 1}>{name}</option> ))}
          </select>
        </div>
      </div>
      <div style={styles.options}>
        <button onClick={handleToggleGeez}>Toggle Ge'ez</button>
        <button onClick={handleToggleLang}>Toggle Language</button>
        {Object.values(HolidayTags).map(tag => ( <label key={tag} style={{ cursor: 'pointer' }}> <input type="checkbox" checked={options.holidayFilter?.includes(tag) ?? false} onChange={() => handleFilterChange(tag)} /> {tag} </label> ))}
      </div>
      <div style={styles.grid}>
        {grid.headers.map((h) => <div key={h} style={styles.header}>{h.slice(0, 3)}</div>)}
        {grid.days.map((day, i) => {
          if (!day) return <div key={i} />;
          const dayStyle = { ...styles.day };
          if (day.isToday) Object.assign(dayStyle, styles.today);
          if (day.holidays.length > 0) Object.assign(dayStyle, styles.holiday);
          return ( <div key={i} style={dayStyle} title={day.holidays.map(h => h.name).join(', ')} onClick={() => handleDayClick(day)}> {day.ethiopian.day} </div> );
        })}
      </div>
    </div>
  );
};


// Storybook metadata
export default {
  title: 'Hooks/useMonthGrid',
  component: MonthGridHarness,
};

// --- STORIES ---
export const InteractiveDemo = {
  name: "Interactive Demo",
  args: { year: 2016, month: 1, useGeez: false, weekdayLang: 'amharic', holidayFilter: [], },
};
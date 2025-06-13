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

// The harness component is now highly configurable with props
const MonthGridHarness = ({
  initialOptions,
  showNavigation = true,
  showSelectors = true,
  showToggles = true,
  showFilters = true,
  showGrid = true,
  showHolidayNames = false,
  showOutputOnly = false,
}) => {
  const [options, setOptions] = useState(initialOptions);
  const [modalData, setModalData] = useState(null);
  const [yearInput, setYearInput] = useState(initialOptions.year.toString());
  const [yearError, setYearError] = useState('');

  const { grid, controls } = useMonthGrid(options);

  useEffect(() => {
    if (grid?.year && !yearError) {
      setYearInput(grid.year.toString());
    }
  }, [grid?.year, yearError]);

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

  const handleYearChange = (e) => {
    const newYearStr = e.target.value;
    setYearInput(newYearStr);
    const newYearNum = parseInt(newYearStr);
    if (!isNaN(newYearNum) && newYearNum >= 1900 && newYearNum <= 2200) {
      setOptions(prev => ({ ...prev, year: newYearNum }));
      setYearError('');
    } else {
      setYearError('Year must be between 1900 and 2200');
    }
  };

  const handleMonthChange = (e) => setOptions(prev => ({ ...prev, month: parseInt(e.target.value) }));
  
  // Styles
  const styles = {
    container: { fontFamily: 'sans-serif', maxWidth: '600px', border: '1px solid #eee', padding: '1rem', borderRadius: '8px' },
    controls: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
    options: { display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px', marginBottom: '1rem', alignItems: 'center' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' },
    day: { minHeight: '60px', padding: '5px', border: '1px solid #eee', textAlign: 'center', background: 'white', cursor: 'pointer', fontSize: '0.9rem' },
    holidayName: { fontSize: '0.7rem', color: '#005a9e', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    holiday: { background: '#e6f7ff', border: '1px solid #91d5ff' },
    today: { background: '#dff0d8', border: '1px solid #3c763d', fontWeight: 'bold' },
    header: { fontWeight: 'bold', textAlign: 'center' },
    selector: { padding: '8px', border: '1px solid #ccc', borderRadius: '4px' },
    error: { color: 'red', fontSize: '0.8rem', marginLeft: '0.5rem' },
    inputError: { border: '1px solid red' },
    output: { padding: '1rem', background: '#eef', border: '1px solid #ccf', borderRadius: '4px', fontFamily: 'monospace' }
  };
  
  if (!grid) return <div>Loading...</div>;
  const amharicMonthNames = monthNames.amharic;

  return (
    <div style={styles.container}>
      {modalData && <Modal content={renderModalContent()} onClose={() => setModalData(null)} />}
      
      {showNavigation && (
        <div style={styles.controls}>
          <button onClick={controls.goPrev}>&lt; Prev Month</button>
          <h3 style={{ margin: 0 }}>{grid.monthName} {grid.year}</h3>
          <button onClick={controls.goNext}>Next Month &gt;</button>
        </div>
      )}
      
      {showSelectors && (
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
      )}
      
      {(showToggles || showFilters) && (
        <div style={styles.options}>
          {showToggles && <button onClick={() => setOptions(prev => ({...prev, useGeez: !prev.useGeez}))}>Toggle Ge'ez</button>}
          {showToggles && <button onClick={() => setOptions(prev => ({...prev, weekdayLang: prev.weekdayLang === 'amharic' ? 'english' : 'amharic'}))}>Toggle Language</button>}
          {showFilters && Object.values(HolidayTags).map(tag => ( <label key={tag} style={{ cursor: 'pointer' }}> <input type="checkbox" checked={options.holidayFilter?.includes(tag) ?? false} onChange={() => setOptions(prev => ({...prev, holidayFilter: prev.holidayFilter?.includes(tag) ? prev.holidayFilter.filter(t => t !== tag) : [...(prev.holidayFilter || []), tag]}))} /> {tag} </label> ))}
        </div>
      )}

      {showGrid && (
        <div style={styles.grid}>
          {grid.headers.map((h) => <div key={h} style={styles.header}>{h.slice(0, 3)}</div>)}
          {grid.days.map((day, i) => {
            if (!day) return <div key={i} />;
            const dayStyle = { ...styles.day };
            if (day.isToday) Object.assign(dayStyle, styles.today);
            if (day.holidays.length > 0) Object.assign(dayStyle, styles.holiday);
            return (
              <div key={i} style={dayStyle} onClick={() => handleDayClick(day)}>
                <div>{day.ethiopian.day}</div>
                {showHolidayNames && day.holidays.map(h => <div key={h.key} style={styles.holidayName}>{h.name}</div>)}
              </div>
            );
          })}
        </div>
      )}
      
      {showOutputOnly && (
        <div style={styles.output}>
          Selected: {amharicMonthNames[options.month - 1]} {options.year} E.C.
        </div>
      )}
    </div>
  );
};


// Storybook metadata
export default {
  title: 'Hooks/useMonthGrid',
  component: MonthGridHarness,
  // Define initial args that all stories can inherit
  args: {
    initialOptions: {
      year: new Date().getFullYear() - 8, // Default to a recent EC year
      month: 1,
      useGeez: false,
      weekdayLang: 'amharic',
      holidayFilter: [],
    }
  }
};

// --- STORIES ---

// Variant 1: A full calendar view with holiday names displayed
export const FullCalendarView = {
  name: "Variant: Full Calendar",
  args: {
    showHolidayNames: true,
  },
};

// Variant 2: Only the month and year selectors are visible
export const MonthYearSelector = {
  name: "Variant: Month & Year Selector Only",
  args: {
    showNavigation: false,
    showToggles: false,
    showFilters: false,
    showGrid: false,
    showOutputOnly: true,
  },
};
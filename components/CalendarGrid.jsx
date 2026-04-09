'use client';

import { HOLIDAYS } from './WallCalendar';

const DOW = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

function toDateVal(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(y, m, d).getTime();
}

function toKey(y, m, d) { return `${y}-${m}-${d}`; }

export default function CalendarGrid({
  year, month, selStart, selEnd, onDayClick, accent, accent2, accentLight
}) {
  const today = new Date();
  const todayKey = toKey(today.getFullYear(), today.getMonth(), today.getDate());

  
  const rawFirst = new Date(year, month, 1).getDay();
  const firstDow = (rawFirst + 6) % 7; 
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  
  const startVal = selStart ? toDateVal(selStart) : null;
  const endVal   = selEnd   ? toDateVal(selEnd)   : null;
  const loVal    = startVal && endVal ? Math.min(startVal, endVal) : startVal;
  const hiVal    = startVal && endVal ? Math.max(startVal, endVal) : startVal;

  function getDayState(y, m, d) {
    const key = toKey(y, m, d);
    const v = new Date(y, m, d).getTime();
    if (!loVal) return { key, state: 'none' };
    if (v === loVal && v === hiVal) return { key, state: 'single' };
    if (v === loVal)  return { key, state: 'start' };
    if (v === hiVal)  return { key, state: 'end' };
    if (loVal && hiVal && v > loVal && v < hiVal) return { key, state: 'range' };
    return { key, state: 'none' };
  }

  function holidayLabel(m1based, d) {
    return HOLIDAYS[`${m1based}-${d}`] || null;
  }

  
  const cells = [];

  
  for (let i = firstDow - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, type: 'other' });
  }

  
  for (let d = 1; d <= daysInMonth; d++) {
    const { key, state } = getDayState(year, month, d);
    const isToday = key === todayKey;
    const dow = (firstDow + d - 1) % 7; 
    const isSat = dow === 5;
    const isSun = dow === 6;
    const holiday = holidayLabel(month + 1, d);
    cells.push({ day: d, type: 'current', key, state, isToday, isSat, isSun, holiday });
  }

  
  const totalCells = Math.ceil(cells.length / 7) * 7;
  let nextDay = 1;
  while (cells.length < totalCells) {
    cells.push({ day: nextDay++, type: 'other' });
  }

  function cellStyle(cell) {
    if (cell.type !== 'current') return {};
    switch (cell.state) {
      case 'start':  return { background: accent,  color: '#fff', borderRadius: '50% 0 0 50%' };
      case 'end':    return { background: accent2, color: '#fff', borderRadius: '0 50% 50% 0' };
      case 'single': return { background: accent,  color: '#fff', borderRadius: '50%' };
      case 'range':  return { background: accentLight, borderRadius: 0 };
      default:       return {};
    }
  }

  return (
    <div className="wc-grid-wrap">
      
      <div className="wc-dow-row">
        {DOW.map((d, i) => (
          <div
            key={d}
            className={`wc-dow-cell${i === 5 ? ' sat' : ''}${i === 6 ? ' sun' : ''}`}
          >
            {d}
          </div>
        ))}
      </div>

      
      <div className="wc-days-grid">
        {cells.map((cell, idx) => (
          <div
            key={idx}
            className={[
              'wc-day',
              cell.type === 'other' ? 'other' : '',
              cell.isToday ? 'today' : '',
              cell.isSat ? 'sat' : '',
              cell.isSun ? 'sun' : '',
              cell.state && cell.state !== 'none' ? cell.state : '',
            ].filter(Boolean).join(' ')}
            style={cellStyle(cell)}
            onClick={() => cell.type === 'current' && onDayClick(cell.key)}
            title={cell.holiday || undefined}
          >
            <span>{cell.day}</span>
            {cell.holiday && <span className="wc-holiday-dot" />}
          </div>
        ))}
      </div>
    </div>
  );
}

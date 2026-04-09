'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarGrid from './CalendarGrid';
import HeroPanel from './HeroPanel';
import NotesPanel from './NotesPanel';
import ThemeSwitcher from './ThemeSwitcher';

export const THEMES = {
  terra:  { accent: '#c4593a', accent2: '#4a7c59', light: '#fdf3f0', name: 'Terra' },
  ocean:  { accent: '#1278b5', accent2: '#d4a017', light: '#e8f5fd', name: 'Ocean' },
  forest: { accent: '#2d6a4f', accent2: '#c4593a', light: '#edf7f1', name: 'Forest' },
  dusk:   { accent: '#6b3fa0', accent2: '#d4a017', light: '#f3eefe', name: 'Dusk'  },
};

const MONTH_PHOTOS = [
  'https://plus.unsplash.com/premium_photo-1720794774013-12946b37fc3b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1688045677446-a8dc76b41449?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1688045530445-66a06a5e9ba6?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1688045722767-8d8672f6950b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1720202104459-ba0a571da6f7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1688045802023-60a42a082776?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1677622477694-4a070d322982?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1688045730646-8ad2cdec3c71?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1721475188278-9f1ff9201f74?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1688045648110-4761be807ea0?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1720794774002-53c5bb1b18ec?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1688045604452-aa630b8a9a8d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export const HOLIDAYS = {
  '1-1':  "New Year's Day",
  '1-26': 'Republic Day',
  '4-14': 'Dr. Ambedkar Jayanti',
  '8-15': 'Independence Day',
  '10-2': 'Gandhi Jayanti',
  '12-25': 'Christmas Day',
};

function loadStorage(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}

export default function WallCalendar() {
  const today = new Date();
  const [year, setYear]     = useState(today.getFullYear());
  const [month, setMonth]   = useState(today.getMonth());
  const [selStart, setSelStart] = useState(null);
  const [selEnd, setSelEnd]     = useState(null);
  const [notes, setNotes]       = useState({});
  const [theme, setTheme]       = useState('terra');
  const [direction, setDirection] = useState(1);
  const [flipping, setFlipping]   = useState(false);

  useEffect(() => {
    setNotes(loadStorage('wc_notes', {}));
    const saved = loadStorage('wc_theme', null);
    if (saved && THEMES[saved]) setTheme(saved);
  }, []);

  useEffect(() => {
    try { localStorage.setItem('wc_notes', JSON.stringify(notes)); } catch {}
  }, [notes]);

  useEffect(() => {
    try { localStorage.setItem('wc_theme', JSON.stringify(theme)); } catch {}
  }, [theme]);

  const navigate = useCallback((dir) => {
    if (flipping) return;
    setFlipping(true);
    setDirection(dir);
    setTimeout(() => {
      setMonth(prev => {
        const next = prev + dir;
        if (next < 0) { setYear(y => y - 1); return 11; }
        if (next > 11) { setYear(y => y + 1); return 0; }
        return next;
      });
      setFlipping(false);
    }, 320);
  }, [flipping]);

  const handleDayClick = (dateKey) => {
    if (!selStart || selEnd) {
      setSelStart(dateKey);
      setSelEnd(null);
    } else {
      if (dateKey === selStart) {
        setSelStart(null);
      } else {
        setSelEnd(dateKey);
      }
    }
  };

  const clearSelection = () => { setSelStart(null); setSelEnd(null); };

  const noteKey = `${year}-${month}`;
  const t = THEMES[theme];

  return (
    <div className="wc-root" style={{ '--accent': t.accent, '--accent2': t.accent2, '--accent-light': t.light }}>
      <div className="wc-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${year}-${month}`}
            className="wc-inner"
            initial={{ rotateY: direction * -15, opacity: 0, scale: 0.97 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: direction * 15, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <HeroPanel
              month={month}
              year={year}
              photoUrl={MONTH_PHOTOS[month]}
              accent={t.accent}
              onPrev={() => navigate(-1)}
              onNext={() => navigate(1)}
            />
            <div className="wc-right">
              <CalendarGrid
                year={year}
                month={month}
                selStart={selStart}
                selEnd={selEnd}
                onDayClick={handleDayClick}
                accent={t.accent}
                accent2={t.accent2}
                accentLight={t.light}
              />
              <NotesPanel
                selStart={selStart}
                selEnd={selEnd}
                value={notes[noteKey] || ''}
                onChange={v => setNotes(n => ({ ...n, [noteKey]: v }))}
                onClear={clearSelection}
                accent={t.accent}
              />
              <ThemeSwitcher current={theme} onChange={setTheme} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

'use client';

import { THEMES } from './WallCalendar';

export default function ThemeSwitcher({ current, onChange }) {
  return (
    <div className="wc-theme-bar">
      <span className="wc-theme-label">Theme</span>
      <div className="wc-theme-dots">
        {Object.entries(THEMES).map(([key, t]) => (
          <button
            key={key}
            className={`wc-theme-dot${current === key ? ' active' : ''}`}
            style={{ background: t.accent }}
            title={t.name}
            aria-label={`Switch to ${t.name} theme`}
            onClick={() => onChange(key)}
          />
        ))}
      </div>
    </div>
  );
}

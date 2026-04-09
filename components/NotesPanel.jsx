'use client';

function formatDate(dateKey) {
  if (!dateKey) return null;
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(y, m, d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

function daysBetween(a, b) {
  const av = new Date(...a.split('-').map(Number));
  const bv = new Date(...b.split('-').map(Number));
  return Math.abs(Math.round((bv - av) / 86400000)) + 1;
}

export default function NotesPanel({ selStart, selEnd, value, onChange, onClear, accent }) {
  const hasRange = selStart && selEnd;
  const hasSingle = selStart && !selEnd;

  const rangeLabel = hasRange
    ? `${formatDate(selStart)} – ${formatDate(selEnd)} · ${daysBetween(selStart, selEnd)} days`
    : hasSingle
    ? `${formatDate(selStart)} selected`
    : null;

  return (
    <div className="wc-notes">
      <div className="wc-notes-header">
        <span className="wc-notes-title">Notes</span>
        {rangeLabel && (
          <span className="wc-range-badge" style={{ background: accent + '18', color: accent, borderColor: accent + '40' }}>
            {rangeLabel}
          </span>
        )}
      </div>

      <textarea
        className="wc-notes-area"
        placeholder="Jot down goals, reminders, or plans for this month…"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ '--focus-color': accent }}
      />

      <div className="wc-notes-footer">
        <button
          className="wc-clear-btn"
          onClick={onClear}
          style={{ '--btn-hover': accent }}
          disabled={!selStart}
        >
          Clear selection
        </button>
        <span className="wc-char-count">{value.length} chars</span>
      </div>
    </div>
  );
}

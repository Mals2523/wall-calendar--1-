'use client';

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const SEASON_TAGS = [
  'Winter Stillness','First Blooms','Cherry Blossom','Spring Showers',
  'Long Golden Days','Midsummer','Harvest Hour','Late Summer',
  'Ember Skies','Fallen Leaves','First Frost','Silent Nights'
];

export default function HeroPanel({ month, year, photoUrl, accent, onPrev, onNext }) {
  return (
    <div className="wc-hero">
      <div className="wc-hero-img-wrap">
        <img
          src={photoUrl}
          alt={`${MONTHS[month]} nature`}
          className="wc-hero-img"
        />
        <div className="wc-hero-gradient" />
      </div>

      <div className="wc-wave-wrap">
        <svg viewBox="0 0 400 70" preserveAspectRatio="none" className="wc-wave-svg">
          <path d="M0,70 L0,35 Q80,0 160,20 Q240,40 320,15 Q370,4 400,0 L400,70 Z" fill={accent} opacity="0.92" />
          <path d="M0,70 L0,48 Q90,18 180,32 Q270,46 340,28 Q375,18 400,12 L400,70 Z" fill={accent} opacity="0.5" />
        </svg>
        <div className="wc-month-label">
          <span className="wc-month-year">{year}</span>
          <span className="wc-month-name">{MONTHS[month].toUpperCase()}</span>
        </div>
      </div>

      <div className="wc-hero-nav">
        <button className="wc-nav-btn" onClick={onPrev} aria-label="Previous month">←</button>
        <span className="wc-season-tag">{SEASON_TAGS[month]}</span>
        <button className="wc-nav-btn" onClick={onNext} aria-label="Next month">→</button>
      </div>
    </div>
  );
}

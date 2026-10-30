import React, { useMemo } from 'react';

const DARK_TIMES = ['evening', 'night'];

export function timeOfDay() {
  const preview = new URLSearchParams(window.location.search).get('time');
  if (['dawn', 'noon', 'afternoon', 'evening', 'night'].includes(preview)) return preview;
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 8) return 'dawn';
  if (hour >= 8 && hour < 14) return 'noon';
  if (hour >= 14 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 20) return 'evening';
  return 'night';
}

export const isDarkTime = (time) => DARK_TIMES.includes(time);

// Keep the sky honest to the chosen theme: a manual dark switch at noon shows night, and vice versa.
export function sceneFor(theme, time) {
  if (theme === 'dark') return isDarkTime(time) ? time : 'night';
  return isDarkTime(time) ? 'noon' : time;
}

function seeded(seed) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function Stars() {
  const stars = useMemo(() => {
    const random = seeded(42);
    return Array.from({ length: 170 }, (_, index) => ({
      x: random() * 100, y: Math.pow(random(), 1.6) * 70, r: random() < 0.06 ? 1.1 : 0.35 + random() * 0.5,
      delay: (random() * 6).toFixed(2), twinkle: index % 5 === 0
    }));
  }, []);
  return <svg className="sky-stars" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    {stars.map((star, index) => <ellipse key={index} className={star.twinkle ? 'twinkle' : undefined} style={{ animationDelay: `${star.delay}s` }} cx={star.x} cy={star.y} rx={star.r * 0.1} ry={star.r * 0.16} />)}
  </svg>;
}

function Cloud({ className, scale = 1 }) {
  return <svg className={`sky-cloud ${className}`} viewBox="0 0 240 110" style={{ '--scale': scale }} aria-hidden="true">
    <g>
      <ellipse cx="70" cy="72" rx="58" ry="26" />
      <ellipse cx="112" cy="50" rx="46" ry="38" />
      <ellipse cx="160" cy="66" rx="52" ry="30" />
      <ellipse cx="190" cy="80" rx="40" ry="20" />
      <ellipse cx="120" cy="84" rx="90" ry="20" />
    </g>
  </svg>;
}

function Horizon() {
  return <svg className="sky-horizon" viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
    <path className="hill-far" d="M0 120 C120 80 220 96 330 108 C450 122 520 70 640 78 C760 86 840 118 960 100 C1060 86 1130 92 1200 104 V220 H0Z" />
    <path className="hill-near" d="M0 160 C140 130 260 150 380 156 C520 164 600 128 740 134 C880 140 980 170 1200 150 V220 H0Z" />
  </svg>;
}

export default function Sky({ scene, hidden }) {
  const night = scene === 'night';
  const cloudy = scene !== 'night';
  return <div className={`sky${hidden ? ' is-hidden' : ''}`} data-scene={scene} aria-hidden="true">
    {(night || scene === 'evening') && <Stars />}
    {night && <><div className="sky-moon" /><span className="shooting-star" /></>}
    {!night && <div className="sky-sun" />}
    {cloudy && <>
      <Cloud className="cloud-a" scale={1.3} />
      <Cloud className="cloud-b" scale={0.8} />
      <Cloud className="cloud-c" scale={1.05} />
      <Cloud className="cloud-d" scale={0.6} />
    </>}
    <Horizon />
    <div className="sky-fade" />
  </div>;
}

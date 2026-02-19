import React, { useEffect, useState, useRef } from 'react';
import './AuthLayout.css';

const CARDS = [
  { id: 0, type: 'highlight', color: '#c084fc', text: 'Build.\nConnect.\nStand out.', dots: true },
  { id: 1, type: 'logo',      color: '#c084fc', icon: true },
  { id: 2, type: 'text',      color: '#fde68a', label: 'Find projects\nthat match\nyour skills', plus: true },
  { id: 3, type: 'text',      color: '#fde68a', label: 'Real projects.\nReal resume.\nReal impact.', plus: true },
  { id: 4, type: 'dark',      color: '#1a2235' },
  { id: 5, type: 'dark',      color: '#0f1624' },
];

const SLOT_POS = [
  { r: 1, c: 1 },
  { r: 1, c: 2 },
  { r: 2, c: 1 },
  { r: 2, c: 2 },
  { r: 3, c: 1 },
  { r: 3, c: 2 },
];

const ACW_NEXT = { 0: 2, 2: 4, 4: 5, 5: 3, 3: 1, 1: 0 };

function getTranslate(fromSlot, toSlot, cellW, cellH, gap) {
  const from = SLOT_POS[fromSlot];
  const to   = SLOT_POS[toSlot];
  return {
    dx: (to.c - from.c) * (cellW + gap),
    dy: (to.r - from.r) * (cellH + gap),
  };
}

function CardContent({ card }) {
  return (
    <>
      {card.dots && (
        <div className="card-dots">
          {Array.from({ length: 25 }).map((_, i) => <span key={i} className="dot" />)}
        </div>
      )}
      {card.plus && <span className="card-plus">+</span>}
      {card.icon && (
        <div className="card-icon">
          <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
            <path d="M6 34 L16 20 L26 28 L38 12" stroke="#0f172a" strokeWidth="4.5"
              strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="38" cy="12" r="5" fill="#0f172a"/>
          </svg>
        </div>
      )}
      {card.text  && <p className="card-main-text">{card.text}</p>}
      {card.label && <p className="card-label-text">{card.label}</p>}
    </>
  );
}

function CardPanel() {
  const [slots, setSlots]           = useState([0, 1, 2, 3, 4, 5]);
  const [translates, setTranslates] = useState({});
  const gridRef      = useRef(null);
  const animatingRef = useRef(false);

  const triggerRotation = () => {
    if (animatingRef.current || !gridRef.current) return;
    animatingRef.current = true;

    const firstCell = gridRef.current.querySelector('.card-cell');
    if (!firstCell) { animatingRef.current = false; return; }

    const cellW = firstCell.offsetWidth;
    const cellH = firstCell.offsetHeight;
    const gap   = 10;

    const newTranslates = {};
    Object.entries(ACW_NEXT).forEach(([from, to]) => {
      const { dx, dy } = getTranslate(parseInt(from), to, cellW, cellH, gap);
      newTranslates[parseInt(from)] = { dx, dy };
    });

    setTranslates(newTranslates);

    setTimeout(() => {
      setSlots(prev => {
        const temp = {};
        Object.entries(ACW_NEXT).forEach(([from, to]) => { temp[to] = prev[parseInt(from)]; });
        const result = [...prev];
        Object.entries(temp).forEach(([slot, card]) => { result[parseInt(slot)] = card; });
        return result;
      });
      setTranslates({});
      animatingRef.current = false;
    }, 600);
  };

  useEffect(() => {
    const id = setInterval(triggerRotation, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card-grid" ref={gridRef}>
      {slots.map((cardIdx, slotIdx) => {
        const card = CARDS[cardIdx];
        const t    = translates[slotIdx];
        return (
          <div
            key={`slot-${slotIdx}`}
            className={`card-cell card-type-${card.type}`}
            style={{
              '--card-color': card.color,
              transform:  t ? `translate(${t.dx}px, ${t.dy}px)` : 'translate(0,0)',
              transition: t
                ? 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'transform 0s, box-shadow 0.3s ease',
              zIndex: t ? 2 : 1,
            }}
          >
            <CardContent card={card} />
          </div>
        );
      })}
    </div>
  );
}

export default function AuthLayout({ children }) {
  return (
    <div className="auth-split">
      <div className="auth-panel-left">
        <div className="panel-inner">

          <div className="panel-brand">
            <span className="brand-campus">Campus</span>
            <span className="brand-forge">Forge</span>
          </div>

          <CardPanel />

          <p className="panel-tagline">Where campus projects come alive</p>
        </div>
      </div>

      <div className="auth-panel-right">
        <div className="auth-form-wrap">
          {children}
        </div>
      </div>
    </div>
  );
}
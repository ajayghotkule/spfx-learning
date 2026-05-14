import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

// ─── useRef has 2 uses ────────────────────────────────────────────────────────
// 1. Access a DOM element directly (like focus, scroll)
// 2. Store a value that does NOT cause re-render when it changes
// ─────────────────────────────────────────────────────────────────────────────

const Class6UseRef: React.FC = () => {

  const [seconds, setSeconds]   = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // ── USE 1: DOM reference ──────────────────────────────────────────────────
  // useRef gives you direct access to a DOM element
  // like document.getElementById() but the React way
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = (): void => {
    inputRef.current?.focus(); // directly focuses the input box
  };

  // ── USE 2: Store value without re-render ──────────────────────────────────
  // useState → changing value causes re-render
  // useRef   → changing value does NOT cause re-render
  // Perfect for storing timer IDs, previous values, counters
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStart = (): void => {
    if (isRunning) return;
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const handleStop = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // use ref to clear the interval
      timerRef.current = null;
    }
    setIsRunning(false);
  };

  const handleReset = (): void => {
    handleStop();
    setSeconds(0);
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div style={{ padding: '16px', border: '1px solid #0078d4', borderRadius: '4px', marginTop: '16px' }}>
      <h2>useRef Example</h2>

      {/* ── USE 1: DOM reference ─────────────────────────────────────────── */}
      <h4>Use 1 — Access DOM element directly</h4>
      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to focus me"
        style={{ padding: '6px', marginRight: '8px', width: '260px' }}
      />
      <button onClick={handleFocus}>Focus Input</button>
      <p style={{ fontSize: '12px', color: '#666' }}>
        useRef points directly to the input element — no re-render needed
      </p>

      {/* ── USE 2: Store timer ID ─────────────────────────────────────────── */}
      <h4 style={{ marginTop: '16px' }}>Use 2 — Store value without re-render</h4>
      <p>Timer: <strong>{seconds}s</strong></p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handleStop} disabled={!isRunning}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
        timerRef stores the interval ID — changing it never causes a re-render
      </p>

      {/* ── Comparison table ─────────────────────────────────────────────── */}
      <h4 style={{ marginTop: '16px' }}>useState vs useRef</h4>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '13px' }}>
        <thead>
          <tr style={{ backgroundColor: '#0078d4', color: '#fff' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}></th>
            <th style={{ padding: '8px', textAlign: 'left' }}>useState</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>useRef</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <td style={{ padding: '8px' }}>Causes re-render?</td>
            <td style={{ padding: '8px', color: 'green' }}>Yes ✅</td>
            <td style={{ padding: '8px', color: 'red' }}>No ❌</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <td style={{ padding: '8px' }}>Access DOM?</td>
            <td style={{ padding: '8px', color: 'red' }}>No ❌</td>
            <td style={{ padding: '8px', color: 'green' }}>Yes ✅</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Use for</td>
            <td style={{ padding: '8px' }}>UI values (count, text)</td>
            <td style={{ padding: '8px' }}>Timer IDs, DOM elements</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Class6UseRef;

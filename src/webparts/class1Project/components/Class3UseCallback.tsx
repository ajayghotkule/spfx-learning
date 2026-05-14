import * as React from 'react';
import { useState, useCallback } from 'react';

// ─── CHILD COMPONENT ──────────────────────────────────────────────────────────
// React.memo means: only re-render this child if its props actually changed.
// Without React.memo, useCallback has no visible effect to demonstrate.
// ─────────────────────────────────────────────────────────────────────────────
const CounterButton: React.FC<{ onClick: () => void; label: string }> = React.memo(({ onClick, label }) => {
  console.log(`"${label}" button re-rendered`); // watch this in F12 console
  return <button onClick={onClick} style={{ marginRight: '8px' }}>{label}</button>;
});

// ─── PARENT COMPONENT ─────────────────────────────────────────────────────────
// useCallback(fn, [deps]) returns a MEMOIZED version of the function.
// React will reuse the same function reference as long as deps don't change.
// Without useCallback, every render creates a NEW function → child re-renders.
// ─────────────────────────────────────────────────────────────────────────────
const Class3UseCallback: React.FC = () => {

  const [countA, setCountA] = useState<number>(0);
  const [countB, setCountB] = useState<number>(0);

  // ── WITHOUT useCallback ───────────────────────────────────────────────────
  // A new function is created on every render.
  // So even when countB changes, this button re-renders unnecessarily.
  const incrementA_noCallback = (): void => {
    setCountA(countA + 1);
  };

  // ── WITH useCallback ──────────────────────────────────────────────────────
  // React reuses the same function reference as long as countB hasn't changed.
  // So changing countB does NOT cause this button to re-render.
  const incrementB_withCallback = useCallback((): void => {
    setCountB(prev => prev + 1); // use "prev" pattern inside useCallback
  }, []); // [] = this function never needs to be recreated

  return (
    <div style={{ padding: '16px', border: '1px solid #0078d4', borderRadius: '4px', marginTop: '16px' }}>
      <h2>useCallback Example</h2>

      <p style={{ backgroundColor: '#fff4ce', padding: '8px' }}>
        Open the browser console (F12) and click the buttons.<br />
        Notice which buttons log a re-render and which do not.
      </p>

      {/* Without useCallback */}
      <h4>Without useCallback</h4>
      <p>Count A: <strong>{countA}</strong></p>
      <CounterButton onClick={incrementA_noCallback} label="Increment A (no useCallback)" />
      <p style={{ color: 'red', fontSize: '12px' }}>
        This button re-renders every time ANY state changes (even countB).
      </p>

      {/* With useCallback */}
      <h4>With useCallback</h4>
      <p>Count B: <strong>{countB}</strong></p>
      <CounterButton onClick={incrementB_withCallback} label="Increment B (with useCallback)" />
      <p style={{ color: 'green', fontSize: '12px' }}>
        This button only re-renders when its own dependency changes.
      </p>

      {/* Trigger re-render from outside */}
      <h4>Trigger re-render of parent</h4>
      <button onClick={() => setCountA(c => c + 1)}>
        Force re-render (increment A)
      </button>
      <p style={{ fontSize: '12px' }}>
        When you click this, watch the console — only the &quot;no useCallback&quot; button logs a re-render.
      </p>
    </div>
  );
};

export default Class3UseCallback;

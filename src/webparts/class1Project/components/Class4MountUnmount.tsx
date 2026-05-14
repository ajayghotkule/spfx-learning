import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

// ─── CHILD COMPONENT ──────────────────────────────────────────────────────────
// This component demonstrates mount and unmount
// ─────────────────────────────────────────────────────────────────────────────
const Timer: React.FC<{ onStop: () => void }> = ({ onStop }) => {

  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    console.log('Timer MOUNTED ✅ - component appeared on screen');

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // CLEANUP FUNCTION = unmount
    // This runs when the component is REMOVED from the screen
    return () => {
      clearInterval(interval);
      console.log('Timer UNMOUNTED ❌ - component removed from screen');
    };

  }, []); // run once on mount

  return (
    <div style={{ padding: '12px', backgroundColor: '#e6f3ff', borderRadius: '4px' }}>
      <p>Timer running: <strong>{seconds} seconds</strong></p>
      <button onClick={onStop}>Stop Timer (unmount)</button>
    </div>
  );
};

// ─── PARENT COMPONENT ─────────────────────────────────────────────────────────
const Class4MountUnmount: React.FC = () => {

  const [showTimer, setShowTimer] = useState<boolean>(false);

  // useCallback — saves this function so it is not recreated on every render
  const handleStop = useCallback(() => {
    setShowTimer(false); // hides Timer → triggers unmount
  }, []);

  const handleStart = useCallback(() => {
    setShowTimer(true); // shows Timer → triggers mount
  }, []);

  return (
    <div style={{ padding: '16px', border: '1px solid #0078d4', borderRadius: '4px', marginTop: '16px' }}>
      <h2>Mount / Unmount / useCallback</h2>

      <p style={{ backgroundColor: '#fff4ce', padding: '8px' }}>
        Open console (F12) and click Start / Stop to see mount and unmount logs.
      </p>

      {/* Show/Hide button */}
      {!showTimer && (
        <button onClick={handleStart}>Start Timer (mount)</button>
      )}

      {/* Timer only exists in DOM when showTimer is true */}
      {showTimer && <Timer onStop={handleStop} />}

      <div style={{ marginTop: '16px', fontSize: '13px', color: '#444' }}>
        <p><strong>Mount</strong> = component appears on screen → useEffect runs</p>
        <p><strong>Unmount</strong> = component removed from screen → useEffect cleanup runs</p>
        <p><strong>useCallback</strong> = handleStop/handleStart are saved, not recreated on re-render</p>
      </div>
    </div>
  );
};

export default Class4MountUnmount;

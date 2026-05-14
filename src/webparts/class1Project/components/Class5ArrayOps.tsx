import * as React from 'react';
import { useState } from 'react';

interface IEmployee {
  id: number;
  name: string;
  department: string;
  salary: number;
}

const employees: IEmployee[] = [
  { id: 1, name: 'Ajay',   department: 'IT',      salary: 50000 },
  { id: 2, name: 'Priya',  department: 'HR',      salary: 45000 },
  { id: 3, name: 'Rahul',  department: 'IT',      salary: 60000 },
  { id: 4, name: 'Sneha',  department: 'Finance', salary: 55000 },
  { id: 5, name: 'Amit',   department: 'HR',      salary: 48000 },
];

const Class5ArrayOps: React.FC = () => {

  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string): void => {
    setLogs(prev => [...prev, msg]);
  };

  const clearLogs = (): void => setLogs([]);

  // ── map ───────────────────────────────────────────────────────────────────
  // Transforms every item → returns a NEW array of same length
  // Most used in JSX to render lists
  const names = employees.map(emp => emp.name);
  // ['Ajay', 'Priya', 'Rahul', 'Sneha', 'Amit']

  // ── forEach ───────────────────────────────────────────────────────────────
  // Loops over every item → returns NOTHING
  // Cannot use in JSX directly — use for side effects (logging, etc.)
  const handleForEach = (): void => {
    clearLogs();
    employees.forEach(emp => {
      addLog(`forEach → ${emp.name} works in ${emp.department}`);
    });
  };

  // ── filter ────────────────────────────────────────────────────────────────
  // Returns a NEW array with only items that match condition
  const handleFilter = (): void => {
    clearLogs();
    const itTeam = employees.filter(emp => emp.department === 'IT');
    itTeam.forEach(emp => addLog(`filter → ${emp.name} (IT dept)`));
  };

  // ── find ──────────────────────────────────────────────────────────────────
  // Returns the FIRST item that matches — or undefined if none found
  const handleFind = (): void => {
    clearLogs();
    const found = employees.find(emp => emp.id === 3);
    addLog(`find → ${found ? found.name : 'not found'}`);
  };

  // ── reduce ────────────────────────────────────────────────────────────────
  // Reduces array to a single value (sum, total, object, etc.)
  const handleReduce = (): void => {
    clearLogs();
    const totalSalary = employees.reduce((total, emp) => total + emp.salary, 0);
    addLog(`reduce → Total salary bill: ₹${totalSalary.toLocaleString()}`);
  };

  return (
    <div style={{ padding: '16px', border: '1px solid #0078d4', borderRadius: '4px', marginTop: '16px' }}>
      <h2>Array Operations</h2>

      {/* ── map in JSX ─────────────────────────────────────────────────────── */}
      <h4>map — render a list in JSX</h4>
      <p style={{ fontSize: '12px', color: '#666' }}>
        map transforms each item → returns new array → JSX renders it
      </p>
      <ul>
        {employees.map(emp => (
          // key is required — helps React identify which item changed
          <li key={emp.id}>
            {emp.name} — {emp.department} — ₹{emp.salary.toLocaleString()}
          </li>
        ))}
      </ul>

      {/* ── map vs forEach ─────────────────────────────────────────────────── */}
      <h4>map vs forEach</h4>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '13px' }}>
        <thead>
          <tr style={{ backgroundColor: '#0078d4', color: '#fff' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Method</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Returns</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Use in JSX?</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Use for</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <td style={{ padding: '8px' }}><strong>map</strong></td>
            <td style={{ padding: '8px' }}>New array</td>
            <td style={{ padding: '8px', color: 'green' }}>Yes ✅</td>
            <td style={{ padding: '8px' }}>Transform &amp; render</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <td style={{ padding: '8px' }}><strong>forEach</strong></td>
            <td style={{ padding: '8px' }}>Nothing</td>
            <td style={{ padding: '8px', color: 'red' }}>No ❌</td>
            <td style={{ padding: '8px' }}>Side effects, logging</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <td style={{ padding: '8px' }}><strong>filter</strong></td>
            <td style={{ padding: '8px' }}>New array (smaller)</td>
            <td style={{ padding: '8px', color: 'green' }}>Yes ✅</td>
            <td style={{ padding: '8px' }}>Filter by condition</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <td style={{ padding: '8px' }}><strong>find</strong></td>
            <td style={{ padding: '8px' }}>Single item</td>
            <td style={{ padding: '8px', color: 'red' }}>No ❌</td>
            <td style={{ padding: '8px' }}>Find one item</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}><strong>reduce</strong></td>
            <td style={{ padding: '8px' }}>Single value</td>
            <td style={{ padding: '8px', color: 'red' }}>No ❌</td>
            <td style={{ padding: '8px' }}>Sum, total, group</td>
          </tr>
        </tbody>
      </table>

      {/* ── Buttons to demo each ───────────────────────────────────────────── */}
      <h4 style={{ marginTop: '16px' }}>Try each operation</h4>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={handleForEach}>forEach</button>
        <button onClick={handleFilter}>filter (IT only)</button>
        <button onClick={handleFind}>find (id = 3)</button>
        <button onClick={handleReduce}>reduce (total salary)</button>
        <button onClick={clearLogs}>Clear</button>
      </div>

      {/* ── Output log ────────────────────────────────────────────────────── */}
      {logs.length > 0 && (
        <div style={{ marginTop: '12px', backgroundColor: '#f3f3f3', padding: '12px', borderRadius: '4px' }}>
          {logs.map((log, index) => (
            <div key={index} style={{ fontFamily: 'monospace', fontSize: '13px' }}>{log}</div>
          ))}
        </div>
      )}

      {/* ── map with names only ───────────────────────────────────────────── */}
      <h4 style={{ marginTop: '16px' }}>map — extract names only</h4>
      <p style={{ fontFamily: 'monospace', fontSize: '13px' }}>
        employees.map(emp =&gt; emp.name) → [{names.join(', ')}]
      </p>
    </div>
  );
};

export default Class5ArrayOps;

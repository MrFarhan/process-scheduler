import React, { useState } from 'react';
import ProcessTable from './components/ProcessTable';
import AddProcessForm from './components/AddProcessForm';
import Scheduler from './components/Scheduler';
import GanttChart from './components/GanttChart';
import './App.css';

function App() {
  const [processes, setProcesses] = useState([]);

  // Add new process to the list
  const addProcess = (newProcess) => {
    setProcesses([...processes, newProcess]);
  };

  return (
    <div className="App">
      <h1>Process Management Simulator (FCFS)</h1>
      <AddProcessForm addProcess={addProcess} />
      <ProcessTable processes={processes} />
      {/* <Scheduler processes={processes} />
      <GanttChart processes={processes} /> */}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import ProcessTable from './components/ProcessTable';
import AddProcessForm from './components/AddProcessForm';
import Scheduler from './components/Scheduler';
import './App.css';

function App() {
  const [processes, setProcesses] = useState([]);

  const addProcess = (newProcess) => {
    setProcesses([...processes, newProcess]);
  };

  return (
    <div className="App">
      <h1>Process Management Simulator</h1>
      <AddProcessForm addProcess={addProcess} />
      <ProcessTable processes={processes} />
      <Scheduler processes={processes} />
    </div>
  );
}

export default App;

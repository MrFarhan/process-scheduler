import React, { useState } from "react";

function App() {
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState([]);

  // Add a new process
  const handleAddProcess = () => {
    setProcesses([
      ...processes,
      { id: processes.length + 1, arrivalTime: "", burstTime: "" },
    ]);
  };

  // Update process input values
  const handleInputChange = (index, field, value) => {
    const newProcesses = [...processes];
    newProcesses[index][field] = Number(value);
    setProcesses(newProcesses);
  };

  // Calculate scheduling using FCFS
  const calculateFCFS = () => {
    let time = 0;
    const schedule = processes
      .sort((a, b) => a.arrivalTime - b.arrivalTime)
      .map((process) => {
        const start = Math.max(time, process.arrivalTime);
        const finish = start + process.burstTime;
        const turnaroundTime = finish - process.arrivalTime;
        const waitingTime = turnaroundTime - process.burstTime;
        const responseTime = start - process.arrivalTime;
        time = finish;
        return {
          ...process,
          start,
          finish,
          turnaroundTime,
          waitingTime,
          responseTime,
        };
      });
    setResults(schedule);
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Process Scheduling Simulator</h1>
      <button onClick={handleAddProcess}>Add Process</button>

      {processes.map((process, index) => (
        <div key={index} style={{ marginTop: "10px" }}>
          <h3>Process {process.id}</h3>
          <label>
            Arrival Time:
            <input
              type="number"
              placeholder="e.g., 0"
              value={process.arrivalTime}
              onChange={(e) =>
                handleInputChange(index, "arrivalTime", e.target.value)
              }
              style={{ marginLeft: "10px" }}
            />
          </label>
          <br />
          <label>
            Burst Time:
            <input
              type="number"
              placeholder="e.g., 5"
              value={process.burstTime}
              onChange={(e) =>
                handleInputChange(index, "burstTime", e.target.value)
              }
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
      ))}

      <button
        onClick={calculateFCFS}
        style={{ marginTop: "20px", marginLeft: "10px" }}
      >
        Calculate FCFS
      </button>

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Scheduling Results</h2>
          <table border="1" style={{ width: "100%", textAlign: "center" }}>
            <thead>
              <tr>
                <th>Process Name</th>
                <th>Arrival Time</th>
                <th>Burst Time</th>
                <th>Start Time</th>
                <th>Finish Time</th>
                <th>Turnaround Time</th>
                <th>Waiting Time</th>
                <th>Response Time</th>
              </tr>
            </thead>
            <tbody>
              {results.map((process) => (
                <tr key={process.id}>
                  <td>P{process.id}</td>
                  <td>{process.arrivalTime}</td>
                  <td>{process.burstTime}</td>
                  <td>{process.start}</td>
                  <td>{process.finish}</td>
                  <td>{process.turnaroundTime}</td>
                  <td>{process.waitingTime}</td>
                  <td>{process.responseTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;

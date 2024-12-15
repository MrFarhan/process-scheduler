import React, { useEffect, useState } from 'react';

function Scheduler({ processes }) {
    const [currentProcess, setCurrentProcess] = useState(null);
    const [queue, setQueue] = useState([]);
    const [algorithm, setAlgorithm] = useState('FCFS'); // Default is First-Come-First-Served
    const [timeQuantum, setTimeQuantum] = useState(2); // Time slice for Round-Robin

    // Sorting by arrival time for FCFS and Round-Robin, by priority for Priority scheduling
    useEffect(() => {
        let sortedProcesses = [...processes];

        if (algorithm === 'FCFS' || algorithm === 'RR') {
            sortedProcesses.sort((a, b) => a.arrivalTime - b.arrivalTime);
        } else if (algorithm === 'Priority') {
            sortedProcesses.sort((a, b) => a.priority - b.priority);
        }

        setQueue(sortedProcesses);
    }, [processes, algorithm]);

    useEffect(() => {
        if (queue.length > 0) {
            const process = queue[0];
            setCurrentProcess(process);

            // Simulate process execution with different algorithms
            if (algorithm === 'FCFS') {
                runProcess(process.cpuBurst);
            } else if (algorithm === 'Priority') {
                runProcess(process.cpuBurst);
            } else if (algorithm === 'RR') {
                runProcess(Math.min(timeQuantum, process.cpuBurst)); // Execute for time quantum or remaining burst time
            }
        }
    }, [queue, algorithm]);

    const runProcess = (burstTime) => {
        if (currentProcess) {
            setTimeout(() => {
                currentProcess.cpuBurst -= burstTime;
                if (currentProcess.cpuBurst <= 0) {
                    currentProcess.state = 'Terminated';
                    setQueue(queue.slice(1));
                } else if (algorithm === 'RR') {
                    currentProcess.state = 'Ready';
                    setQueue([...queue.slice(1), currentProcess]); // Move current process to the end of the queue
                }
                setCurrentProcess(null);
            }, burstTime * 1000); // Simulate execution
        }
    };

    return (
        <div>
            <h2>Scheduler</h2>
            <div>
                <label>
                    Scheduling Algorithm:
                    <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                        <option value="FCFS">First-Come-First-Served</option>
                        <option value="Priority">Priority Scheduling</option>
                        <option value="RR">Round-Robin</option>
                    </select>
                </label>
                {algorithm === 'RR' && (
                    <div>
                        <label>
                            Time Quantum:
                            <input
                                type="number"
                                value={timeQuantum}
                                onChange={(e) => setTimeQuantum(parseInt(e.target.value))}
                            />
                        </label>
                    </div>
                )}
            </div>
            {currentProcess ? (
                <p>Currently Running: {currentProcess.id} (Remaining CPU Burst: {currentProcess.cpuBurst})</p>
            ) : (
                <p>No process is running</p>
            )}
            <h3>Queue:</h3>
            <ul>
                {queue.map((p) => (
                    <li key={p.id}>
                        {p.id} (Arrival Time: {p.arrivalTime}, Burst Time: {p.cpuBurst}, Priority: {p.priority})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Scheduler;

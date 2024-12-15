import React, { useEffect, useState } from 'react';

function Scheduler({ processes }) {
    const [currentProcess, setCurrentProcess] = useState(null);
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        // Sort processes by arrival time to simulate FCFS
        const sortedProcesses = [...processes].sort(
            (a, b) => a.arrivalTime - b.arrivalTime
        );
        setQueue(sortedProcesses);
    }, [processes]);

    // Start the scheduler (simulated)
    useEffect(() => {
        if (queue.length > 0) {
            const process = queue[0];
            setCurrentProcess(process);

            // Simulate process execution with a delay (representing the CPU burst time)
            const timer = setTimeout(() => {
                process.state = 'Terminated';
                setQueue((prevQueue) => prevQueue.slice(1));
                setCurrentProcess(null);
            }, process.cpuBurst * 1000);

            return () => clearTimeout(timer);
        }
    }, [queue, currentProcess]);

    return (
        <div>
            <h2>Scheduler (FCFS)</h2>
            {currentProcess ? (
                <p>Currently Running: {currentProcess.id}</p>
            ) : (
                <p>No process is running</p>
            )}
            <h3>Queue:</h3>
            <ul>
                {queue.map((p) => (
                    <li key={p.id}>
                        {p.id} (Arrival Time: {p.arrivalTime}, Burst Time: {p.cpuBurst})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Scheduler;

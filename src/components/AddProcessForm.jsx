import React, { useState } from 'react';

function AddProcessForm({ addProcess }) {
    const [processId, setProcessId] = useState('');
    const [cpuBurst, setCpuBurst] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProcess = {
            id: processId,
            cpuBurst: parseInt(cpuBurst),
            arrivalTime: parseInt(arrivalTime),
            state: 'Ready',
        };
        addProcess(newProcess);
        setProcessId('');
        setCpuBurst('');
        setArrivalTime('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Process ID"
                value={processId}
                onChange={(e) => setProcessId(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="CPU Burst Time"
                value={cpuBurst}
                onChange={(e) => setCpuBurst(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Arrival Time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                required
            />
            <button type="submit">Add Process</button>
        </form>
    );
}

export default AddProcessForm;
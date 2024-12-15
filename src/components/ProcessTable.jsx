import React from 'react';

function ProcessTable({ processes }) {
    return (
        <div>
            <h2>Process List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Process ID</th>
                        <th>CPU Burst Time</th>
                        <th>Arrival Time</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {processes.map((process) => (
                        <tr key={process.id}>
                            <td>{process.id}</td>
                            <td>{process.cpuBurst}</td>
                            <td>{process.arrivalTime}</td>
                            <td>{process.state}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProcessTable;

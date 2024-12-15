import React from 'react';

function GanttChart({ processes }) {
    const totalBurstTime = processes.reduce((acc, process) => acc + process.cpuBurst, 0);
    return (
        <div>
            <h2>Gantt Chart</h2>
            <div style={{ display: 'flex', width: '100%' }}>
                {processes.map((process) => {
                    const widthPercentage = (process.cpuBurst / totalBurstTime) * 100;
                    return (
                        <div
                            key={process.id}
                            style={{
                                width: `${widthPercentage}%`,
                                border: '1px solid black',
                                textAlign: 'center',
                                padding: '5px',
                            }}
                        >
                            {process.id}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default GanttChart;

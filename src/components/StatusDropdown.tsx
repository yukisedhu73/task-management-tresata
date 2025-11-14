import React, { useState } from 'react'
import type { TaskStatus } from '../types/task'
import downArw from '../assets/downArw.svg'
import upArw from '../assets/upArw.svg'

const dotColor: Record<TaskStatus, string> = {
    Pending: 'var(--pending-dot)',
    'In Progress': 'var(--inprogress-dot)',
    Completed: 'var(--completed-dot)',
}

interface Props {
    value: TaskStatus
    onChange: (v: TaskStatus) => void
}

const StatusDropdown: React.FC<Props> = ({ value, onChange }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="status-dd-wrapper">
            <button className="status-dd-header" onClick={() => setOpen(o => !o)}>
                <span className="dot" style={{ background: dotColor[value] }}></span>
                {value}
                <img
                    src={open ? upArw : downArw}
                    className="dd-arrow"
                    alt="dropdown arrow"
                />            </button>

            {open && (
                <div className="status-dd-body">
                    {(['Pending', 'In Progress', 'Completed'] as TaskStatus[]).map(s => (
                        <div
                            key={s}
                            className={`status-dd-item ${s === value ? 'active' : ''}`}
                            onClick={() => {
                                onChange(s)
                                setOpen(false)
                            }}
                        >
                            <span className="dot" style={{ background: dotColor[s] }}></span>
                            {s}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default StatusDropdown
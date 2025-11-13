import React, { useState } from 'react'
import type { Task } from '../types/task'

interface Props {
    task: Task
    onEdit: () => void
    onDelete: () => void
    onUpdate: (t: Task) => void
}

const dotColor = (status: string) => {
    if (status === 'Pending') return 'var(--pending-dot)'
    if (status === 'In Progress') return 'var(--inprogress-dot)'
    return 'var(--completed-dot)'
}

const TaskItem: React.FC<Props> = ({ task, onEdit, onDelete, onUpdate }) => {
    const [hover, setHover] = useState(false)

    const toggleComplete = () => {
        const next = task.status === 'Completed' ? 'Pending' : 'Completed'
        onUpdate({ ...task, status: next })
    }

    const openEdit = () => onEdit()

    return (
        <div className={`task-card ${hover ? 'hover' : ''}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className='task-left'>
                <div className='avatar'>{task.title.charAt(0).toUpperCase()}</div>
            </div>
            <div className='task-main' onClick={openEdit}>
                <div className='task-title-row'>
                    <div className='task-title'>{task.title}</div>
                    <div className='task-status'>
                        <span className='dot' style={{ background: dotColor(task.status) }} />
                        <span className='status-text'>{task.status}</span>
                    </div>
                </div>
                {task.description && <div className='task-desc'>{task.description}</div>}
                <div className='task-date'>{new Date(task.date).toLocaleDateString()}</div>
            </div>
            <div className='task-actions'>
                <button className='icon-btn' title='Toggle Completed' onClick={toggleComplete}>{task.status === 'Completed' ? '↺' : '✔'}</button>
                <button className='icon-btn' title='Edit' onClick={openEdit}>✎</button>
                <button className='icon-btn delete' title='Delete' onClick={onDelete}>🗑</button>
            </div>
        </div>
    )
}

export default TaskItem
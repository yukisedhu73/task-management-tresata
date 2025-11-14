import React, { useState } from 'react'
import type { Task } from '../types/task'
import TaskItem from './TaskItem'
import downArw from '../assets/downArw.svg'
import upArw from '../assets/upArw.svg'

interface Props {
    tasks: Task[]
    onEdit: (t: Task) => void
    onDelete: (id: string) => void
    onUpdate: (t: Task) => void
    counts: { pending: number; inprogress: number; completed: number }
}

const Section: React.FC<{ title: string; count: number; children: React.ReactNode }> = ({ title, count, children }) => {
    const [open, setOpen] = useState(false) // ← CLOSED by default

    return (
        <div className='section'>
            <button className='section-header' onClick={() => setOpen(s => !s)}>
                <span>{title} ({count})</span>

                <img
                    src={open ? upArw : downArw}
                    className="dd-arrow"
                    alt="dropdown arrow"
                />
            </button>

            {open && <div className='section-body'>{children}</div>}
        </div>
    )
}

const TaskList: React.FC<Props> = ({ tasks, onEdit, onDelete, onUpdate, counts }) => {
    const group = (status: string) => tasks.filter(t => t.status === status)

    return (
        <div>
            <Section title='In Progress' count={counts.inprogress}>
                {group('In Progress').map(t => (
                    <TaskItem key={t.id} task={t} onEdit={() => onEdit(t)} onDelete={() => onDelete(t.id)} onUpdate={onUpdate} />
                ))}
            </Section>

            <Section title='Pending' count={counts.pending}>
                {group('Pending').map(t => (
                    <TaskItem key={t.id} task={t} onEdit={() => onEdit(t)} onDelete={() => onDelete(t.id)} onUpdate={onUpdate} />
                ))}
            </Section>

            <Section title='Completed' count={counts.completed}>
                {group('Completed').map(t => (
                    <TaskItem key={t.id} task={t} onEdit={() => onEdit(t)} onDelete={() => onDelete(t.id)} onUpdate={onUpdate} />
                ))}
            </Section>
        </div>
    )
}

export default TaskList
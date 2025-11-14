import React from 'react'
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
    filter: "All" | "Completed" | "Incomplete"
    searchQuery: string;
}

const Section: React.FC<{
    title: string;
    count: number;
    children: React.ReactNode;
}> = ({ title, count, children }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div className='section'>
            <button className='section-header' onClick={() => setOpen(s => !s)}>
                <span>{title} ({count})</span>
                <img src={open ? upArw : downArw} className="dd-arrow" alt="" />
            </button>

            {open && (
                <div className='section-body'>
                    {React.Children.count(children) > 0 ? children : (
                        <div className="no-task">No tasks found</div>
                    )}
                </div>
            )}
        </div>
    )
}

const TaskList: React.FC<Props> = ({ tasks, onEdit, onDelete, onUpdate, counts, filter, searchQuery }) => {

    const searched = tasks.filter(t => {
        const q = searchQuery.toLowerCase()
        return (
            t.title.toLowerCase().includes(q) ||
            t.description?.toLowerCase().includes(q)
        )
    })

    const group = (status: string) =>
        searched.filter(t => t.status === status)

    const showInProgress = filter === "All" || filter === "Incomplete"
    const showPending = filter === "All" || filter === "Incomplete"
    const showCompleted = filter === "All" || filter === "Completed"

    return (
        <div>

            {/* IN PROGRESS */}
            {showInProgress && (
                <Section title="In Progress" count={counts.inprogress}>
                    {group('In Progress').map(t => (
                        <TaskItem
                            key={t.id}
                            task={t}
                            onEdit={() => onEdit(t)}
                            onDelete={() => onDelete(t.id)}
                            onUpdate={onUpdate}
                        />
                    ))}
                </Section>
            )}

            {/* PENDING */}
            {showPending && (
                <Section title="Pending" count={counts.pending}>
                    {group('Pending').map(t => (
                        <TaskItem
                            key={t.id}
                            task={t}
                            onEdit={() => onEdit(t)}
                            onDelete={() => onDelete(t.id)}
                            onUpdate={onUpdate}
                        />
                    ))}
                </Section>
            )}

            {/* COMPLETED */}
            {showCompleted && (
                <Section title="Completed" count={counts.completed}>
                    {group('Completed').map(t => (
                        <TaskItem
                            key={t.id}
                            task={t}
                            onEdit={() => onEdit(t)}
                            onDelete={() => onDelete(t.id)}
                            onUpdate={onUpdate}
                        />
                    ))}
                </Section>
            )}

        </div>
    )
}

export default TaskList
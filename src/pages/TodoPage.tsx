import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import TaskList from '../components/TaskList'
import type { Task, TaskStatus } from '../types/task'

interface Props {
    tasks: Task[]
    onDelete: (id: string) => void
    onUpdate: (task: Task) => void
}

const TodoPage: React.FC<Props> = ({ tasks, onDelete, onUpdate }) => {
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [filter,] = useState<'All' | TaskStatus | 'Open'>('All')

    const filtered = useMemo(() => {
        let arr = tasks
        if (query.trim()) {
            const q = query.toLowerCase()
            arr = arr.filter(t => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q))
        }
        if (filter === 'All' || filter === 'Open') return arr
        return arr.filter(t => t.status === filter)
    }, [tasks, query, filter])

    // We'll compute counts for accordions like in design
    const counts = useMemo(() => ({
        pending: tasks.filter(t => t.status === 'Pending').length,
        inprogress: tasks.filter(t => t.status === 'In Progress').length,
        completed: tasks.filter(t => t.status === 'Completed').length,
    }), [tasks])

    return (
        <div className='page'>
            <Header title='TO-DO APP' onBack={() => { /* no-op on main */ }} showBack={false} />
            <div className='container'>
                <div className='search-row'>
                    <input className='search-input' placeholder='Search To-Do' value={query} onChange={e => setQuery(e.target.value)} />
                </div>

                <TaskList
                    tasks={filtered}
                    onEdit={t => navigate(`/edit/${t.id}`)}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    counts={counts}
                />

                <button className='fab' onClick={() => navigate('/add')}>+</button>
            </div>
        </div>
    )
}

export default TodoPage
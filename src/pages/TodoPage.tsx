import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import TaskList from '../components/TaskList'
import type { Task } from '../types/task'

interface Props {
    tasks: Task[]
    onDelete: (id: string) => void
    onUpdate: (task: Task) => void
}

const TodoPage: React.FC<Props> = ({ tasks, onDelete, onUpdate }) => {
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState<"All" | "Completed" | "Incomplete">("All")

    const filtered = useMemo(() => {
        let arr = tasks

        // search logic
        if (query.trim()) {
            const q = query.toLowerCase()
            arr = arr.filter(t =>
                t.title.toLowerCase().includes(q) ||
                t.description?.toLowerCase().includes(q)
            )
        }

        // filter logic
        if (filter === "Completed") {
            return arr.filter(t => t.status === "Completed")
        }
        if (filter === "Incomplete") {
            return arr.filter(t => t.status !== "Completed")
        }

        return arr
    }, [tasks, filter])

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

                <div className="filter-row">
                    <button
                        className={`filter-btn ${filter === "All" ? "active" : ""}`}
                        onClick={() => setFilter("All")}
                    >
                        All
                    </button>

                    <button
                        className={`filter-btn ${filter === "Completed" ? "active" : ""}`}
                        onClick={() => setFilter("Completed")}
                    >
                        Completed
                    </button>

                    <button
                        className={`filter-btn ${filter === "Incomplete" ? "active" : ""}`}
                        onClick={() => setFilter("Incomplete")}
                    >
                        Incomplete
                    </button>
                </div>

                <TaskList
                    tasks={filtered}
                    onEdit={t => navigate(`/edit/${t.id}`)}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    counts={counts}
                    filter={filter}
                    searchQuery={query}
                />

                <button className='fab' onClick={() => navigate('/add')}>+</button>
            </div>
        </div>
    )
}

export default TodoPage
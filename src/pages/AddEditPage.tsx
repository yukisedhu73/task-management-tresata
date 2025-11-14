import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import type { Task, TaskStatus } from '../types/task'
import { v4 as uuidv4 } from 'uuid'
import StatusDropdown from '../components/StatusDropdown'
import toast from 'react-hot-toast'

interface Props {
    mode: 'add' | 'edit'
    tasks?: Task[]
    onSave: (task: Task) => void
}

const AddEditPage: React.FC<Props> = ({ mode, tasks = [], onSave }) => {
    const nav = useNavigate()
    const { id } = useParams()
    const editing = mode === 'edit' && id

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState<TaskStatus>('Pending')

    // NEW ERROR STATES
    const [titleError, setTitleError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')

    useEffect(() => {
        if (editing) {
            const t = tasks.find(x => x.id === id)
            if (t) {
                setTitle(t.title)
                setDescription(t.description || '')
                setStatus(t.status)
            }
        }
    }, [editing, id, tasks])

    const onSubmit = () => {
        let hasError = false

        // reset errors
        setTitleError('')
        setDescriptionError('')

        // validate title
        if (!title.trim()) {
            setTitleError('Title is required.')
            hasError = true
        }

        // validate description
        if (!description.trim()) {
            setDescriptionError('Description is required.')
            hasError = true
        }

        if (hasError) return

        const normalized: Task = {
            id: editing ? id! : uuidv4(),
            title: title.trim(),
            description: description.trim(),
            status,
            date: new Date().toISOString()
        }

        onSave(normalized)
        toast.success(editing ? "Task Updated!" : "Task Added!")
        nav('/')
    }

    return (
        <div className="page">
            <Header title={mode === 'add' ? 'Add Task' : 'Edit Task'} showBack onBack={() => nav('/')} />

            <div className="container">

                <div className="form-row">
                    <input
                        className={titleError ? 'input-error' : ''}
                        value={title}
                        onChange={e => {
                            setTitle(e.target.value)
                            if (titleError) setTitleError('')
                        }}
                        placeholder="Enter the title"
                    />
                    {titleError && <p className="error-text">{titleError}</p>}
                </div>

                <div className="form-row">
                    <textarea
                        className={descriptionError ? 'input-error' : ''}
                        value={description}
                        onChange={e => {
                            setDescription(e.target.value)
                            if (descriptionError) setDescriptionError('')
                        }}
                        placeholder="Enter the description"
                        rows={4}
                    />
                    {descriptionError && <p className="error-text">{descriptionError}</p>}
                </div>
                {mode === 'edit' && (
                    <div className="form-row">
                        <StatusDropdown value={status} onChange={setStatus} />
                    </div>
                )}

                <div className="button-row">
                    <button className="btn-outline" onClick={() => nav('/')}>Cancel</button>
                    <div style={{ flex: 1 }}></div>
                    <button className="btn-primary" onClick={onSubmit}>
                        {mode === 'add' ? 'ADD' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddEditPage
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import type { Task, TaskStatus } from '../types/task'
import { v4 as uuidv4 } from 'uuid'

interface Props {
    mode: 'add' | 'edit'
    tasks?: Task[]
    onSave: (task: Task) => void
    onDelete?: (id: string) => void
}

const AddEditPage: React.FC<Props> = ({ mode, tasks = [], onSave, onDelete }) => {
    const nav = useNavigate()
    const { id } = useParams()
    const editing = mode === 'edit' && id

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState<TaskStatus>('Pending')

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
        if (!title.trim()) return alert('Please enter a title')
        if (editing) {
            onSave({ id: id!, title: title.trim(), description: description.trim(), status, date: new Date().toISOString() })
        } else {
            onSave({ id: uuidv4(), title: title.trim(), description: description.trim(), status, date: new Date().toISOString() })
        }
        nav('/')
    }

    const handleDelete = () => {
        if (!id || !onDelete) return
        if (confirm('Delete this task?')) {
            onDelete(id)
            nav('/')
        }
    }

    return (
        <div className='page'>
            <Header title={mode === 'add' ? 'Add Task' : 'Edit Task'} onBack={() => nav('/')} showBack={true} />
            <div className='container'>
                <div className='form-row'>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder={mode === 'add' ? 'Enter the title' : ''} />
                </div>
                <div className='form-row'>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder='Enter the description' rows={4} />
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                    <button className='btn-outline' onClick={() => nav('/')}>Cancel</button>
                    <div style={{ flex: 1 }} />
                    {mode === 'edit' && (
                        <button className='btn-outline danger' onClick={handleDelete}>Delete</button>
                    )}
                    <button className='btn-primary' onClick={onSubmit}>{mode === 'add' ? 'ADD' : 'Update'}</button>
                </div>

            </div>
        </div>
    )
}

export default AddEditPage
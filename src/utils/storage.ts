import type { Task } from '../types/task'

const KEY = 'todo_tasks_v1'

export const loadTasks = (): Task[] => {
    try {
        const raw = localStorage.getItem(KEY)
        if (!raw) return []
        return JSON.parse(raw) as Task[]
    } catch (e) {
        console.error('Failed to load tasks', e)
        return []
    }
}

export const saveTasks = (tasks: Task[]) => {
    try {
        localStorage.setItem(KEY, JSON.stringify(tasks))
    } catch (e) {
        console.error('Failed to save tasks', e)
    }
}
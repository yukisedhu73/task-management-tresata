import type { Task } from '../types/task'
export const sample: Task[] = [
    { id: '1', title: 'Lorem Ipsum', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', status: 'In Progress', date: new Date().toISOString() },
    { id: '2', title: 'Todo two', description: 'Short description', status: 'Pending', date: new Date().toISOString() },
]
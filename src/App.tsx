import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import TodoPage from './pages/TodoPage'
import AddEditPage from './pages/AddEditPage'
import type { Task } from './types/task'
import { loadTasks, saveTasks } from './utils/storage'
import { sample } from './data/sample'

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const saved = loadTasks()

    if (saved.length === 0) {
      setTasks(sample)
      saveTasks(sample)
    } else {
      setTasks(saved)
    }
  }, [])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = (task: Task) => setTasks(prev => [task, ...prev])

  const updateTask = (updated: Task) =>
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)))

  const deleteTask = (id: string) =>
    setTasks(prev => prev.filter(t => t.id !== id))

  return (
    <Routes>
      <Route
        path="/"
        element={
          <TodoPage
            tasks={tasks}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        }
      />

      <Route
        path="/add"
        element={<AddEditPage mode="add" onSave={addTask} />}
      />

      <Route
        path="/edit/:id"
        element={
          <AddEditPage
            mode="edit"
            tasks={tasks}
            onSave={updateTask}
          />
        }
      />
    </Routes>
  )
}

export default App;
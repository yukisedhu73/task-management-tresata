import React, { useState } from "react"
import type { Task } from "../types/task"
import PencilIcon from "../assets/Pencil.svg"
import TrashIcon from "../assets/Trash.svg"
import { formatDate } from "../utils/formatDate"
import toast from "react-hot-toast"

interface Props {
    task: Task
    onEdit: () => void
    onDelete: () => void
    onUpdate: (t: Task) => void
}

const dotColor = (status: string) =>
({
    Pending: "var(--pending-dot)",
    "In Progress": "var(--inprogress-dot)",
    Completed: "var(--completed-dot)",
}[status])

const TaskItem: React.FC<Props> = ({ task, onEdit, onDelete }) => {
    const [hover, setHover] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false)

    const confirmDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowConfirm(true)
    }

    const handleDelete = () => {
        onDelete()
        toast.error("Task Deleted!")
        setShowConfirm(false)
    }


    return (
        <>
            <div
                className={`task-card ${hover ? "hover" : ""} ${task.status === "Completed" ? "completed" : ""}`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >

                <div className="avatar">
                    {task.title.charAt(0).toUpperCase()}
                </div>

                {/* MAIN CONTENT */}
                <div className="task-info" onClick={onEdit}>
                    <div className="task-row-1">
                        <h4 className="task-title">{task.title}</h4>

                        <div className="task-status">
                            <span className="dot" style={{ background: dotColor(task.status) }} />
                            {task.status}
                        </div>
                    </div>

                    {/* ROW 2 — Description */}
                    <p className="task-desc">{task.description}</p>

                    <div className="task-row-3">
                        <p className="task-date">
                            {formatDate(task.date)}
                        </p>

                        {hover && (
                            <div className="task-actions">
                                <button
                                    className="icon-btn"
                                    title="Edit Task"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onEdit()
                                    }}
                                >
                                    <img src={PencilIcon} style={{ height: 30, width: 30 }} alt="edit" />
                                </button>

                                <button
                                    className="icon-btn delete"
                                    title="Delete Task"
                                    onClick={confirmDelete}
                                >
                                    <img src={TrashIcon} style={{ height: 30, width: 30 }} alt="delete" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showConfirm && (
                <div className="confirm-overlay">
                    <div className="confirm-box">
                        <p>Are you sure you want to delete this task?</p>

                        <div className="confirm-actions">
                            <button
                                className="btn-outline"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setShowConfirm(false)
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn-primary danger"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete()
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default TaskItem;
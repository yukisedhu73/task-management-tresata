import React, { useState } from "react"
import type { Task } from "../types/task"
import PencilIcon from "../assets/Pencil.svg"
import TrashIcon from "../assets/Trash.svg"

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
    const [hover, setHover] = useState(false)

    return (
        <div
            className={`task-card ${hover ? "hover" : ""}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* LEFT AVATAR */}
            <div className="avatar">
                {task.title.charAt(0).toUpperCase()}
            </div>

            {/* MAIN CONTENT */}
            <div className="task-info" onClick={onEdit}>

                {/* ROW 1 — Title left, status right */}
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
                    {/* LEFT: DATE */}
                    <p className="task-date">
                        {new Date(task.date).toLocaleDateString()}
                    </p>

                    {/* RIGHT: EDIT + DELETE — stays on the right */}
                    {hover && (
                        <div className="task-actions">
                            <button
                                className="icon-btn"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onEdit()
                                }}
                            >
                                <img src={PencilIcon} alt="edit" />
                            </button>

                            <button
                                className="icon-btn delete"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDelete()
                                }}
                            >
                                <img src={TrashIcon} alt="delete" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskItem;
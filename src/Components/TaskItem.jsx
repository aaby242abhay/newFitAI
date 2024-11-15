// TaskItem.jsx
import React from 'react';

const TaskItem = ({ task, deleteTask, updateTask, setEditingTask }) => {
    const toggleComplete = () => updateTask({ ...task, completed: !task.completed });

    const handleEdit = () => {
        setEditingTask(task); // Set the task to be edited
    };

    return (
        <div
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                margin: '12px 0',
                backgroundColor: '#f9f9f9',
                transition: 'transform 0.2s',
            }}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h3 style={{ marginBottom: '8px', color: '#333' }}>{task.title}</h3>
                </div>
                <div>
                    {/* Edit Icon */}
                    <button
                        onClick={handleEdit}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0',
                        }}
                    >
                        <span style={{ fontSize: '16px', color: '#4CAF50' }}>✎</span>
                    </button>
                </div>
            </div>
            <p style={{ marginBottom: '8px', color: '#555' }}>{task.description}</p>
            <p style={{ marginBottom: '8px', color: '#777' }}>Due Date: {task.dueDate}</p>
            <p style={{ marginBottom: '16px', color: '#777' }}>Priority: {task.priority}</p>
            <div>
                <button
                    onClick={toggleComplete}
                    style={{
                        backgroundColor: task.completed ? '#ff6347' : '#4caf50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        marginRight: '8px',
                        transition: 'background-color 0.3s',
                    }}
                >
                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                        backgroundColor: '#f44336',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem; // Ensure this is a default export

import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, editingTask, setEditingTask }) => {
    const [task, setTask] = useState({ title: '', description: '', dueDate: '', priority: 'Low', completed: false });

    useEffect(() => {
        if (editingTask) {
            setTask({ ...editingTask });
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(task);
        setTask({ title: '', description: '', dueDate: '', priority: 'Low', completed: false });
        setEditingTask(null); // Reset after submitting
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 max-w-2xl mx-auto space-y-4"
        >
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
                {editingTask ? 'Edit Task' : 'Add New Task'}
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {/* Title Input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Title"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none shadow-sm"
                    />
                </div>

                {/* Due Date Input */}
                <div className="relative">
                    <input
                        type="date"
                        value={task.dueDate}
                        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none shadow-sm"
                    />
                </div>
            </div>

            {/* Description Input */}
            <div className="relative">
                <textarea
                    placeholder="Description"
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none shadow-sm"
                />
            </div>

            {/* Priority Input */}
            <div className="relative">
                <select
                    value={task.priority}
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none shadow-sm"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button
                    type="submit"
                    className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                    {editingTask ? 'Edit Task' : 'Add Task'}
                </button>
            </div>
        </form>
    );
};

export default TaskForm;

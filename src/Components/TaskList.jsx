// TaskList.jsx
import React from 'react';
import TaskItem from './TaskItem'; // Importing TaskItem as default export

const TaskList = ({ tasks, deleteTask, updateTask, setEditingTask }) => {
    return (
        <div>
            {tasks.map((task) => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    deleteTask={deleteTask} 
                    updateTask={updateTask} 
                    setEditingTask={setEditingTask} 
                />
            ))}
        </div>
    );
};

export default TaskList;

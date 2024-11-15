import React, { useState, useEffect } from 'react';
import TaskForm from './Components/TaskForm';
import TaskFilter from './Components/TaskFilter';
import TaskList from './Components/TaskList';

function App() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('All');

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        applyFilters(); // Reapply filters when tasks change
    }, [tasks]);

    useEffect(() => {
        applyFilters(); // Apply filters when search term or priority filter changes
    }, [searchTerm, priorityFilter]);

    const addTask = (task) => {
        if (editingTask) {
            setTasks(tasks.map(t => (t.id === editingTask.id ? { ...task, id: editingTask.id } : t)));
            setEditingTask(null);
        } else {
            setTasks([
                ...tasks,
                { 
                    ...task, 
                    id: Date.now(), 
                    completed: false, 
                    name: task.name || 'Untitled Task' // Default to "Untitled Task" if no name is provided
                }
            ]);
        }
    };
    

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const updateTask = (updatedTask) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    };

    const applyFilters = () => {
        let filtered = tasks;

        // Apply priority filter
        if (priorityFilter !== 'All') {
            filtered = filtered.filter(task => task.priority === priorityFilter);
        }

        // Apply search filter
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(task =>
                task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredTasks(filtered);
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingTasks = filteredTasks.filter(task => new Date(task.dueDate) > today && !task.completed);
    const overdueTasks = filteredTasks.filter(task => new Date(task.dueDate) < today && !task.completed);
    const completedTasks = filteredTasks.filter(task => task.completed);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <TaskForm
                addTask={addTask}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
            />

            <TaskFilter
                filterTasks={setPriorityFilter}
                searchTasks={setSearchTerm}
            />

            <div className="flex gap-6 mt-6">
                {/* Upcoming Tasks */}
                <div className="flex-1 bg-blue-100 rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-bold text-blue-700 mb-4">Upcoming Tasks</h2>
                    <TaskList
                        tasks={upcomingTasks}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                        setEditingTask={setEditingTask}
                    />
                </div>

                {/* Overdue Tasks */}
                <div className="flex-1 bg-red-100 rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-bold text-red-700 mb-4">Overdue Tasks</h2>
                    <TaskList
                        tasks={overdueTasks}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                        setEditingTask={setEditingTask}
                    />
                </div>

                {/* Completed Tasks */}
                <div className="flex-1 bg-green-100 rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-bold text-green-700 mb-4">Completed Tasks</h2>
                    <TaskList
                        tasks={completedTasks}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                        setEditingTask={setEditingTask}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;

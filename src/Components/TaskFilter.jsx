import React, { useState } from 'react';

const TaskFilter = ({ tasks, filterTasks, searchTasks }) => {
    const [priority, setPriority] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);

    const handlePriorityChange = (e) => {
        const selectedPriority = e.target.value;
        setPriority(selectedPriority);
        filterTasks(selectedPriority); // Pass selected priority to the parent
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        searchTasks(value); // Pass search term to parent component
    };

    return (
        <div className="flex gap-6 items-center mt-6 bg-white p-4 rounded-lg shadow-lg">
            {/* Search Box */}
            <div className="flex-1 flex items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search tasks..."
                    className="w-3/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={() => searchTasks(searchTerm)} // Trigger search on click
                    className="ml-3 p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </div>

            {/* Priority Filter */}
            <div className="flex-none">
                <label className="mr-2 text-gray-700 text-sm font-semibold">Filter</label>
                <select
                    value={priority}
                    onChange={handlePriorityChange}
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="All">All</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
        </div>
    );
};

export default TaskFilter;

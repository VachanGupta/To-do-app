import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTasks, setNewTasks] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); 
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTask, setEditedTask] = useState("");

    function handleInputChange(event) {
        setNewTasks(event.target.value);
    }

    function handleSearchChange(event) {
        setSearchQuery(event.target.value);
    }

    function addTasks() {
        if (newTasks.trim() !== "") {
            setTasks(t => [...t, newTasks]);
            setNewTasks("");
        }
    }

    function deleteTask(index) {
        const updateTasks = tasks.filter((_, i) => i !== index);
        setTasks(updateTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function startEditing(index) {
        setEditingIndex(index);
        setEditedTask(tasks[index]);
    }

    function handleEditChange(event) {
        setEditedTask(event.target.value);
    }

    function saveEdit(index) {
        if (editedTask.trim() !== "") {
            const updatedTasks = [...tasks];
            updatedTasks[index] = editedTask;
            setTasks(updatedTasks);
            setEditingIndex(null);
            setEditedTask("");
        }
    }

    const filteredTasks = tasks.filter(task => task.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className='to-do-list'>
            <h1>To-Do List</h1>
            
            <input 
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={handleSearchChange}
            />

            <div>
                <input type="text" 
                    placeholder='Enter a new task...' 
                    value={newTasks}
                    onChange={handleInputChange} />
                <button 
                    className='add-button'
                    onClick={addTasks}>
                    Add Task
                </button>
            </div>

            <ol>
                {filteredTasks.map((task, index) => (
                    <li key={index}>
                        {editingIndex === index ? (
                            <>
                                <input type="text" value={editedTask} onChange={handleEditChange} />
                                <button className='save-button' onClick={() => saveEdit(index)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span className='text'>{task}</span>
                                <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
                                <button className='move-button' onClick={() => moveTaskUp(index)}>Up</button>
                                <button className='move-button' onClick={() => moveTaskDown(index)}>Down</button>
                                <button className='edit-button' onClick={() => startEditing(index)}>Edit</button>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;

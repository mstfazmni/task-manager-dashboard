import React, {useState, useEffect} from "react";
import './Task.css';
import axios from "axios";


const Task = ({title, assignedTo, dueDate, status, onDelete, taskId, task, onUpdateTask}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTask, setEditTask] = useState({
        title: "",
        assignedTo: "",
        dueDate: "",
        status: "To Do"
    });

    const toggleEditPopup = () =>{
        setIsEditing((prevState) => !prevState);
    };

    const handleEditTask = (task) => {
        //testing if the task is being passed properly
        console.log('Editing Task:', task);
        if (!task) {
            console.error('Task is undefined');
            return;
        }
        setEditTask(task);
        setIsEditing(true);
    };

    const handleEditInputChange = (event) => {
        const {name, value} = event.target;
        setEditTask((prev) => ({...prev, [name]: value}));
    };

    const handleUpdateTask = async (event) => {
        event.preventDefault();

        try{
            const res = await axios.put(`http://localhost:5000/api/tasks/${editTask._id}`, editTask);
            if (res.status === 200) {
                alert('Task updated successfully');
                toggleEditPopup();
                setEditTask({title: "", assignedTo: "", dueDate: "", status: "To Do"});
                setIsEditing(false);

                //notify Dashboard.jsx (parent) about the updated task
                if(onUpdateTask) {
                    // Pass the updated task back to the parent
                    onUpdateTask(res.data.task)
                }
            }
        } catch (error) {
            console.error('Error updating task', error);
            alert('An error occurred while updating the task');
        }
    };

    return(
        <div className="task-container">
            <h4>{title}</h4>
            <p><strong>Assigned to:</strong> {assignedTo}</p>
            <p><strong>Due Date:</strong> {dueDate}</p>
            <p>{status}</p>
            <div className="task-actions">
                {/* ==================================== */}

                <button className="task-edit-btn" onClick={() => handleEditTask(task)}>Edit</button>
                {/* Form for editing task */}
                {isEditing && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <h3>Edit Task</h3>
                            <form className="task-form" onSubmit={handleUpdateTask}>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Task title"
                                    value={editTask.title}
                                    onChange={handleEditInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="assignedTo"
                                    value={editTask.assignedTo}
                                    onChange={handleEditInputChange}
                                    required
                                />
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={editTask.dueDate}
                                    onChange={handleEditInputChange}
                                    required
                                />
                               <select
                                name="status"
                                value={editTask.status}
                                onChange={handleEditInputChange}
                                >
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                                <div className="popup-actions">
                                    <button type="submit">Edit</button>
                                    <button type="button" onClick={toggleEditPopup}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* ==================================== */}
                <button className="task-delete-btn" onClick={() => onDelete(taskId)}>Delete</button>
            </div>
        </div>
    );
};

export default Task;
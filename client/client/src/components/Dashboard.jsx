import React, { useState, useEffect } from "react";
import './Dashboard.css';
import Task from "./Task";
import axios from "axios";
//importing calendar and stylings
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    // Toggle new task form
    const [showTaskForm, setShowTaskForm] = useState(false);

    // Toggle new project form
    const [showProjectForm, setShowProjectForm] = useState(false);

    //Toggle Edit button
    const [isEditing, setIsEditing] = useState(false);

     // ===============================================
     //Calendar
    //To track the selected date
    const [date, setDate] = useState(new Date());
    // showing calendar 
    const [showCalendar, setShowCalendar] = useState(false);
    const [tasksForSelectedDate, setTasksForSelectedDate] = useState([])
    const handleCalendarToggle = () => {
        setShowCalendar((prevState) => !prevState);
    }

    // Update the date state when a user selects a date
    const handleDateChange = (newDate) => {
        setDate(newDate);
        console.log("Selected date: ", newDate);

        //filter tasks by the selected date
        const formattedDate = newDate.toISOString().split('T')[0];
        const tasksForThisDate = tasks.filter(task=>{
            const taskDueDate = new Date(task.dueDate).toISOString().split('T')[0];
            return taskDueDate === formattedDate;
        })
        setTasksForSelectedDate(tasksForThisDate); 
    };

    const getTaskDueDates = () => {
        return tasks.map(task => {
            const taskDueDate = new Date(task.dueDate);
            return taskDueDate.toISOString().split('T')[0];
        });
    };
     // ===============================================

    // =====================================================================

    // State for adding new task
    const [newTask, setNewTask] = useState({
        title: "",
        assignedTo: "",
        dueDate: "",
        status: "To Do"
    });

    // State for adding new project
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        status: "Active",
    });

    // To store the project being edited
    const [editProject, setEditProject] = useState({
        title: "",
        description: "",
        status: "Active",
    });

    // =====================================================================

    // State to store tasks and projects
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null); // To store the selected project, Initially, no project selected


    // =====================================================================

    // Fetch projects from the backend
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/projects');
                setProjects(res.data); // Save projects to state
            } catch (error) {
                console.log("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);
    
    // Fetch tasks from the backend
    useEffect(() => {
        if(selectedProject){
        const fetchTasks = async () => {
            try {    
                const res = await axios.get(`http://localhost:5000/api/tasks`);
                setTasks(res.data);
            } catch (error) {
                console.log("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }
    }, []);

    //to save the open project and tasks associated to it be shown even while refreshing the page
    useEffect(() => {
        if (selectedProject) {
            localStorage.setItem("selectedProject", selectedProject._id);
        }
    }, [selectedProject])

    useEffect(() => {
        const savedProjectId = localStorage.getItem("selectedProject");
        if (savedProjectId) {
            const project = projects.find(p => p._id === savedProjectId);
            if(project){
                setSelectedProject(project);
                fetchTasksForProject(project);
            }
        }
    }, [projects])

    useEffect(() => {
        // Fetch tasks for selected project
        if (selectedProject) {
            fetchTasksForProject(selectedProject);
        }
    }, [selectedProject]);

    const fetchTasksForProject = async (project) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/tasks/project/${project._id}`);
            setTasks(res.data); // Update tasks for the selected project
        } catch (error) {
            console.error("Error fetching tasks for project", error);
        }
    };

    const handleProjectClick = async (project) => {
        setSelectedProject(project); // Set the clicked project as the selected project
        localStorage.setItem("selectedProject", project._id); // Save selected project ID to localStorage

        try{
            const res = await axios.get(`http://localhost:5000/api/tasks/project/${project._id}`);
            setTasks(res.data);//update tasks to show only those related to selected project
        }catch (error){
            console.log("Error fetching tasks for project", error);
        }
    };

    // =====================================================================

    const handleFormToggle = () => {
        setShowTaskForm(!showTaskForm);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleAddTask = async (event) => {
        event.preventDefault();
        try {
            const taskWithProject = {...newTask, projectId: selectedProject};
            const res = await axios.post(`http://localhost:5000/api/tasks`, taskWithProject);

            setTasks((prevTasks) => [...prevTasks, res.data]); 
            setNewTask({ title: "", assignedTo: "", dueDate: "", status: "To Do" }); //reset
            setSelectedProject(""); //reset project selection
            setShowTaskForm(false);
        } catch (error) {
            console.log("Error adding task:", error);
        }
    };

    // =====================================================================
   
    const handleDeleteProject = async (projectId) => {
        if(window.confirm("Are you sure you want to delete this project?")) {
        try{
            const res = await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
            alert(res.data.message);
            setProjects(projects.filter((project) => project._id !== projectId));
        } catch (error) {
            console.error("Error deleting project", error);
            alert("Error deleting project");
        }
    }
    };

    // =====================================================================
    
    const handleDeleteTask = async (taskId) => {
        if(window.confirm("Are you sure you want to delete this task?")) {
            try {
                const res = await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
                alert(res.data.message); 
                // Update the tasks state to remove the deleted task
                setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId)); 
            } catch (error) {
                console.error("Error deleting task", error);
                alert("Error deleting task");
            }
        }
    };

    // =====================================================================

    const toggleProjectPopup = () => {
        setShowProjectForm((prevState)=> !prevState);
    };

    
    const handleProjectInputChange = (event) => {
        const {name, value} = event.target;
        setNewProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };

    const handleAddProject = async (event) =>{
        event.preventDefault();
        
        try{
            const res = await axios.post('http://localhost:5000/api/projects', newProject);
            if (res.status === 201){
                setProjects((prevProjects) => [...prevProjects, res.data]);
                alert("Project added successfully.");
                toggleProjectPopup();
                //reset form
                setNewProject({ title: "", description: "", status: "Active"});
            }
        } catch (error) {
            console.error(error);
            alert("Faild to add the project");
        }
    };
    // =====================================================================

    const toggleEditPopup = () => {
        setIsEditing((prevState)=> !prevState)
    };

    const handleEditProject = (project) => {
        // Populate the form with the project details
        setEditProject(project);
        // Show the form
        setIsEditing(true);
    };

    const handleEditInputChange = (event) => {
        const {name, value} = event.target;
        setEditProject((prev)=> ({...prev, [name]: value}));
    };

    const handleUpdateProject = async (event) => {
        event.preventDefault();

        try{
            const res = await axios.put(`http://localhost:5000/api/projects/${editProject._id}`, editProject);
                if(res.status === 200) {
                            alert('Project updated successfully');
                            toggleEditPopup();
                            //reset form
                            setEditProject({ title: "", description: "", status: "Active"});
                            //update the project list satate
                            setProjects((prevProjects) => 
                            prevProjects.map((project) => 
                            project._id === res.data.project._id 
                            ? res.data.project : project 
                        )
                    );
                    
                    setIsEditing(false);
            }
        }catch(error){
            console.error('error updating project', error);
            alert('An error occurred while updating the project');
        }
    };

    // =====================================================================
    // to show the updated tasks right after it gets updated in Task.jsx 
    const handleUpdateTask = (updatedTask) => {
        setTasks(prevTasks =>
            prevTasks.map(task => (task._id === updatedTask._id ? updatedTask : task))
        );
    };
    // =====================================================================
    //save due dates to be shown in calendar 

    // =====================================================================
    //navigate const to naviagte to profile page
    const navigate = useNavigate();
    const handleProfileClick = () => {
        navigate('/profile')
    }
    const handleContactClick = () => {
        navigate('/contact')
    }
    const handleAboutClick = () => {
        navigate('/about');
    }
    // =====================================================================

    return (
        <div className="dashboard-container">
            {/* Left-menu */}
            <section className="left-menu">
                {/* Main Menu Section */}
                <label htmlFor="touchs">
                    <span className="menu-span">Main Menu</span>
                </label>
                <input className="checkbox" id="touchs" type="checkbox"/>
                <ul className="slides">
                    <div>
                        <li className="profile-option"><p onClick={handleProfileClick}>Profile</p></li>
                        <li className="contact-option"><p onClick={handleContactClick}>Contact</p></li>
                        <li className="about-option"><p onClick={handleAboutClick}>About</p></li>
                    </div>
                </ul>

                {/*  */}
                    <label htmlFor="touch"><span className="project-span">Projects</span></label>
                    <input type="checkbox" id="touch"/>
                    <ul className="slide">
                        {/*==========================*/}

                         {/* Form for adding a new project */}
                            <button className="add-new-project-button" onClick={toggleProjectPopup}><strong>+</strong> Create New</button>
                            {showProjectForm && (
                                <div className="popup-overlay">
                                    <div className="popup-content">
                                        <h3>Add New Project</h3>
                                        <form className="project-form" onSubmit={handleAddProject}>
                                            <input
                                                type="text"
                                                name="title"
                                                placeholder="Project Title"
                                                value={newProject.title}
                                                onChange={handleProjectInputChange}
                                                required
                                            />
                                            <textarea
                                                name="description"
                                                placeholder="Project Description"
                                                value={newProject.description}
                                                onChange={handleProjectInputChange}
                                                required
                                            />
                                            <select
                                                name="status"
                                                value={newProject.status}
                                                onChange={handleProjectInputChange}
                                            >
                                                <option value="Active">Active</option>
                                            </select>
                                            <div className="popup-actions">
                                                <button className="save-project-btn" type="submit">Save</button>
                                                <button className="cancel-project-btn" type="button" onClick={toggleProjectPopup}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                        {/*==========================*/}

                        {projects.map((project, index) => (
                            <div key={index} className="li-project-div">
                                <li>
                                    <Link to="#" onClick={() => handleProjectClick(project)}>{project.title}</Link>
                                </li>
                                <div className="btn-control">
                                    <button className="delete-btn" onClick={() => handleDeleteProject(project._id)}>Delete</button>
                                    <button className="edit-btn" onClick={() => handleEditProject(project)}>Edit</button>
                                </div>
                                {/* Form for ediditing project */}
                                
                                {isEditing && (
                                    <div className="popup-overlay-edit">
                                        <div className="popup-content">
                                            <h3>Edit Project</h3>
                                            <form className="project-form" onSubmit={handleUpdateProject}>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    placeholder="Project Title"
                                                    value={editProject.title}
                                                    onChange={handleEditInputChange}
                                                    required
                                                />
                                                <textarea
                                                    name="description"
                                                    placeholder="Project Description"
                                                    value={editProject.description}
                                                    onChange={handleEditInputChange}
                                                    required
                                                />
                                                <select
                                                    name="status"
                                                    value={editProject.status}
                                                    onChange={handleEditInputChange}
                                                >
                                                    <option value="Active">Active</option>
                                                    <option className="Completed">Completed</option>

                                                </select>
                                                <div className="popup-actions">
                                                    <button className="edit-project-btn" type="submit">Edit</button>
                                                    <button className="" type="button" onClick={toggleEditPopup}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                                
                            </div>
                        ))}
                        
                    </ul>

                   

                {/*===============================================================================*/}
            </section>

            {/* Right-segment */}
            <section className="right-segment">
                <div className="project-info-segment">
                    {selectedProject ? (
                        <>
                            <h1>{selectedProject.title}</h1>
                            <h5>{selectedProject.description}</h5>
                            <h6>{selectedProject.status}</h6>
                        </>
                    ) : (
                        <p className="p-projects">
                            Select a project from <strong>Main Menu</strong> to view related tasks.</p>
                    )}
                </div>

                {/* Progress container */}
                <div className="progress-container">
                    <div className="progress-header">

                        {/* *********************Calender********************* */}
                        <div>
                            <button className="calender-button" onClick={handleCalendarToggle}>📅 Calendar</button>
                            {showCalendar && (
                            <div className="popup-overlay-calendar">
                                <div className="popup-content-calendar">
                                    <Calendar
                                        // When a user selects a date
                                        onChange={handleDateChange}
                                        // Current selected date
                                        value={date}
                                        tileClassName={({ date, view }) => {
                                            // Highlight the dates that have tasks due
                                            const taskDueDates = getTaskDueDates();
                                            const dateString = date.toISOString().split('T')[0];  // Convert date to YYYY-MM-DD format
                                            return taskDueDates.includes(dateString) ? 'due' : null;
                                        }}
                                    />
                                     {/* show tasks for the selected date */}
                                        {tasksForSelectedDate.length > 0 ? (
                                            <div className="tasks-for-selected-date">
                                                <h3>Tasks for {date.toLocaleDateString()}</h3>
                                                <ul>
                                                    {tasksForSelectedDate.map((task) => (
                                                        <li key={task._id}>
                                                            <strong>{task.title}</strong>
                                                            <p>{task.description}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <div>No tasks for this date</div>
                                        )}
                                    <div className="popup-actions-calendar">
                                        <button className="close-calendar-button" onClick={handleCalendarToggle}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                            )}
                            
                        </div>
                         {/* show tasks for the selected date */}
                        {/* *********************Calender********************* */}
                        <div className="progress-controls">
                            <input type="text" placeholder="Search a Task..." className="search-input"/>
                            <button className="add-new-task-button" onClick={handleFormToggle}>Add New Task</button>
                        </div>
                    </div>

                    {/* Form for adding a new task */}
                    {showTaskForm && (
                        <div className="popup-overlay-task">
                            <div className="popup-content-task">
                                <form className="task-form" onSubmit={handleAddTask}>
                                    <select 
                                        className="project-dropdown"
                                        name="projectId"
                                        value={selectedProject}
                                        onChange={(event)=> setSelectedProject(event.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select a Project</option>
                                        {projects.map(project => (
                                            <option key={project._id} value={project._id}>
                                                {project.title}
                                            </option>
                                        ))}
                                    </select>
                                    
                                        <input
                                            type="text"
                                            name="title"
                                            value={newTask.title}
                                            onChange={handleInputChange}
                                            placeholder="Task Title"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="assignedTo"
                                            value={newTask.assignedTo}
                                            onChange={handleInputChange}
                                            placeholder="Assigned To"
                                            required
                                        />
                                        <input
                                            type="date"
                                            name="dueDate"
                                            value={newTask.dueDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <br></br>
                                        <select className="status-dropdown" name="status" value={newTask.status} onChange={handleInputChange}>
                                            <option value="To Do">To Do</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                        <div className="popup-actions-task">
                                            <button type="submit" className="task-save-btn">Save</button>
                                            <button className="task-cancel-btn" onClick={handleFormToggle}>Cancel</button>
                                        </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Columns for To Do, In Progress, Completed tasks */}
                    <div className="progress-columns">
                        {['To Do', 'In Progress', 'Completed'].map(status => (
                            <div key={status} className={`progress-column ${status.toLowerCase().replace(" ", "-")}`}>
                                <h3>{status}</h3>
                                {tasks.filter(task => task.status === status).map(task => (
                                    <Task key={task._id}
                                        task={task}
                                        {...task}
                                        onDelete = {() => handleDeleteTask(task._id)}
                                        onUpdateTask = {updatedTask => handleUpdateTask(updatedTask)}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;

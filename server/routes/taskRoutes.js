const express = require('express');
const Task = require('../models/Task');
// const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

//create a new task
router.post('/tasks', async (req, res) => {
    const {title, assignedTo, dueDate, status, projectId} = req.body;

    try{
        const newTask = new Task({
            title,
            assignedTo,
            dueDate,
            status,
            projectId,
            // user: req.user.userId 
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error){
        console.error(error);
        res.status(500).json({message: 'Error adding task'})
    }
});

// =====================================================================

// Get all tasks
router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error(error)
        res.status(500).json({messgae: 'Error fetching tasks'});
    }
});

// =====================================================================

//Get tasks based on projectId
router.get('/tasks/project/:projectId', async (req, res) => {
    const {projectId} = req.params;
    // console.log('Project ID received:', projectId); //test

    try{
        const tasks = await Task.find({projectId});
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error fetching tasks for the chosen project"});
    }
});

// =====================================================================
//delete single task
router.delete('/tasks/:taskId', async (req, res) => {
    const {taskId} = req.params;

    try{
        const task = await Task.findByIdAndDelete(taskId);

        if(!task){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json({message: 'Task deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Unable to delete task'});
    }
});

// =====================================================================
//update task
router.put('/tasks/:taskId', async (req, res) => {
    const {taskId} = req.params;
    const updatedData = req.body;

    try{
        const task = await Task.findByIdAndUpdate(
            taskId,
            updatedData,
            {new: true}
        );

        if(!task) {
            return res.status(404).json({message: 'Task not found'})
        }
        res.status(200).json({
            message: 'Task Updated successfully',
            task
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Unable to update the task'});
    }
});


module.exports = router;
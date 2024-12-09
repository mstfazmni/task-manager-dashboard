const express = require('express');
const Project = require('../models/Project');
const Task = require('../models/Task')
const router = express.Router();

//create a new project
router.post('/projects', async (req, res) => {
    const {title, description, status} = req.body;

    try{
        const newProject = new Project({
            title,
            description,
            status,
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error adding project'});
    }
});

// =====================================================================
//get all projects
router.get('/projects', async (req, res) => {
    try{
        const projects = await Project.find();
        res.json(projects);
    }catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error fetching projects'});
    }
});

// =====================================================================
//delete project by ID and related tasks
router.delete('/projects/:projectId', async (req, res) => {
    // Get the projectId from the URL parameter
    const {projectId} = req.params;

    try{
        //first delete all tasks related to the project
        await Task.deleteMany({projectId});
        
        //then Find and delete the project by ID
        const project = await Project.findByIdAndDelete(projectId);

        if(!project){
            return res.status(404).json({message: 'Project not found'});
        }
        res.status(200).json({message: 'Project and related tasks deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Unable to delete project and related tasks'})
    }
});

// =====================================================================
//update a project
router.put('/projects/:projectId', async (req, res) => {
    // Get the projectId from the URL parameter
    const {projectId} = req.params;
    // The data to update (title, description, status) (to get the new data you want to update the project with.)
    const updatedData = req.body;

    try{
        const project = await Project.findByIdAndUpdate(
            projectId, // The ID of the project to update
            updatedData, // The new data for the project
            {new: true} // Return the updated document (Ensures the updated project is returned.)
        );

        if(!project){
            return res.status(404).json({message: 'Project not found'})
        }
        res.status(200).json({
            message: 'Project Updated successfully',
            project
        });

    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Unable to update the project'});
    }
});
// =====================================================================

module.exports = router;
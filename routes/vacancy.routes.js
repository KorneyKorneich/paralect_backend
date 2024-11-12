const express = require('express');
const Job = require('../models/Job');
const mongoose = require('mongoose');

const router = express.Router();


router.get('/getAllJobs', async (req, res) => {
    try {
        const values = await Job.find();
        res.json(values);
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Server error' });
    }
});

router.put('/updateJob', async (req, res) => {
    try {
        const { _id, ...jobData } = req.body; 

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send({ message: 'Invalid job ID' });
        }

        const jobToUpdate = await Job.findByIdAndUpdate(
            new mongoose.Types.ObjectId(_id),
            jobData,  
            { new: true } 
        );  

        if (!jobToUpdate) {
            return res.status(404).send({ message: 'Job not found' });
        }

        res.json(jobToUpdate);
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Server error' });
    }
});

router.post('/createJob', async (req, res) => {
    console.log(req.body);
    try {
        const newJob = new Job({ ...req.body });
        const savedJob = await newJob.save(); 
        res.status(201).json(savedJob); 
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Server error' });
    }
});

router.delete('/deleteJob', async (req, res) => {
    try {
        const { id } = req.body;
        const deletedJob = await Job.findByIdAndDelete(new mongoose.Types.ObjectId(id));

        if (!deletedJob) {
            return res.status(404).send({ message: 'Job not found' });
        }

        res.status(200).send({ message: 'Job successfully deleted', deletedJob });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Server error' });
    }
});

module.exports = router;
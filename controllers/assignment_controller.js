const sequelize = require('../util/config')
const Account = require('../models/Account')
const Assignments = require('../models/Assignments')
const logger = require("../util/logger");
const StatsD =  require("node-statsd");
const statsd = new StatsD({ host: "localhost", port: 8125 });

const getAllAssignments = async (req,res) => {
    try{
        statsd.increment("endpoint.get.allAssignment");
        if (req.body && Object.keys(req.body).length > 0){
            logger.error("Invalid get request with body included");
            return res.status(400).send();
        }
        const allAssignments = await Assignments.findAll();
        logger.info("All assignments requested");
        return res.status(200).json(allAssignments).send();
    }
    catch(error){
        logger.error(error.message);
        return res.status(400).json({error: 'Bad Request'}).send();
    }
}
const createAssignment = async (req,res) => {
    
    try{
        statsd.increment("endpoint.post.Assignment");
        const name = req.body.name;
        const points = req.body.points;
        const num_of_attempts = req.body.num_of_attempts;
        const deadline = req.body.deadline;
        const createdBy = req.account.email;
        if(!name || !points || !num_of_attempts || !deadline || !createdBy || Object.keys(req.body).length > 4){
            logger.error("Bad request: Invalid body parameters");
            return res.status(400).json({error: 'Bad Request'}).send();
        }
        const new_assignment = await Assignments.create({
            name: name,
            points: points,
            num_of_attempts: num_of_attempts,
            deadline: deadline,
            createdBy: createdBy
        });
        logger.info("New assignment created by user: " + createdBy);
        return res.status(201).json(new_assignment).send();
    }
    catch(error){
        logger.error(error.message);
        return res.status(400).json({error: 'Bad Request'}).send();
    }
}
const getAssignment = async (req,res) => {
    try{
        statsd.increment("endpoint.get.AssignmentByID");
        const id = req.params.id;
        if (req.body && Object.keys(req.body).length > 0){
            logger.error("Invalid get request with body included");
            return res.status(400).send();
        }
        const assignment = await Assignments.findOne({where: {id: id}});
        if(!assignment){
            logger.error("No assignment with id: " + id);
            return res.status(404).json({error: 'id not found'}).send();
        }
        return res.status(200).json(assignment).send();
    }
    catch(error){
        logger.error(error.message);
        return res.status(400).json({error: 'Bad Request'}).send();
    }
}
const deleteAssignment = async (req,res) => {
    try{
        statsd.increment("endpoint.delete.Assignment");
        const id = req.params.id;
        const assignment = await Assignments.findOne({where: {id: id}});
        if(!assignment){
            logger.error("No assignment with id: " + id);
            return res.status(404).json({error: 'id not found'}).send();
        }
        if(assignment.createdBy!=req.account.email){
            logger.error("Forbidden delete action by User: " , req.account.email);
            return res.status(403).json({error: 'Forbidden'}).send();
        }
        await assignment.destroy();
        logger.info("Assignment deleted for assignment id: " + id);
        return res.status(204).send();
    }
    catch(error){
        logger.error(error.message);
        return res.status(400).json({error: 'Bad Request'}).send();
    }
}
const updateAssignment = async (req,res) => {
    try{
        statsd.increment("endpoint.put.Assignment");
        const id = req.params.id;
        const name = req.body.name;
        const points = req.body.points;
        const num_of_attempts = req.body.num_of_attempts;
        const deadline = req.body.deadline;
        if(!name || !points || !num_of_attempts || !deadline || Object.keys(req.body).length > 4 ){
            logger.error("Bad request: Invalid body parameters");
            return res.status(400).json({error: 'Bad Request'}).send();
        }
        const assignment = await Assignments.findOne({where: {id: id}});
        if(!assignment){
            logger.error("No assignment with id: " + id);
            return res.status(404).json({error: 'id not found'}).send();
        }
        if(assignment.createdBy!=req.account.email){
            logger.error("Forbidden update action by User: " + req.account.email);
            return res.status(403).json({error: 'Forbidden'}).send();
        }
        assignment.name = name;
        assignment.points = points;
        assignment.num_of_attempts = num_of_attempts;
        assignment.deadline = deadline;
        await assignment.save();
        logger.info("Assignment updated for assignment id: " + id);
        return res.status(204).send(); 
    }
    catch(error){
        logger.error(error.message);
        return res.status(400).json({error: 'Bad Request'}).send();
    }
}

const patch1 = async (req,res) => {
    try{
        return res.status(405).send();
    }
    catch{
        return res.status(400).json({error: 'Bad Request'}).send();
    }
}
const patch2 = async (req,res) => {
    try{
        return res.status(405).send();
    }
    catch{
        return res.status(400).json({error: 'Bad Request'}).send();
    }
}

module.exports = {getAllAssignments, createAssignment, getAssignment, deleteAssignment, updateAssignment,patch1,patch2}
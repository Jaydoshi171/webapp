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
            logger.warn("Invalid get request because of body or url parameters in getAllAssignments function");
            return res.status(400).send();
        }
        const allAssignments = await Assignments.findAll();
        logger.info("All assignments requested");
        return res.status(200).json(allAssignments).send();
    }
    catch(error){
        logger.error(`Error in getAllAssignments function: ${error.message}`);
        return res.status(400).json({error: 'Bad Request'}).send();
    }
}
function checkDate(input) {
    let regex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?([Zz])$/
    // let regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?([Zz]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?/i;
    return regex.test(input);
}

const createAssignment = async (req,res) => {
    
    try{
        statsd.increment("endpoint.post.Assignment");
        const name = req.body.name;
        const points = req.body.points;
        const num_of_attempts = req.body.num_of_attempts;
        const deadline = req.body.deadline;
        const createdBy = req.account.email;
        const date = new Date(deadline);
        if(!Number.isInteger(points) || !Number.isInteger(num_of_attempts)){
            logger.warn("Bad post request because of bad request body in createAssignment function");
            return res.status(400).json({error: 'Bad Request'}).send();
        }
        if (!(typeof name === 'string' || name instanceof String)){
            logger.warn("Bad post request because of bad request body in createAssignment function");
            return res.status(400).json({error: 'Bad Request'}).send();
        }
        if(!checkDate(deadline)){
            logger.warn("Bad post request because of bad request body in createAssignment function");
            return res.status(400).json({error: 'Bad Request'}).send();
        }
        if(!name || !points || !num_of_attempts || !deadline || !createdBy || Object.keys(req.body).length > 4){
            logger.warn("Bad post request because of bad request body in createAssignment function");
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
        logger.error(`Error in createAssignment function: ${error.message}`);
        return res.status(400).json({error: 'Bad Request'}).send();
    }
}
const getAssignment = async (req,res) => {
    try{
        statsd.increment("endpoint.get.AssignmentByID");
        const id = req.params.id;
        if (req.body && Object.keys(req.body).length > 0){
            logger.warn("Invalid get request because of body or url parameters in getAssignment function");
            return res.status(400).send();
        }
        const assignment = await Assignments.findOne({where: {id: id}});
        if(!assignment){
            logger.warn("No assignment found in getAssignment function with id: " + id);
            return res.status(404).json({error: 'id not found'}).send();
        }
        logger.info("Assignment requested in getAssignment for id: " + id);
        return res.status(200).json(assignment).send();
    }
    catch(error){
        logger.error(`Error in getAssignment function: ${error.message}`);
        return res.status(400).json({error: 'Bad Request'}).send();
    }
}
const deleteAssignment = async (req,res) => {
    try{
        statsd.increment("endpoint.delete.Assignment");
        const id = req.params.id;
        const assignment = await Assignments.findOne({where: {id: id}});
        if(!assignment){
            logger.warn("No assignment found in getAssignment function with id: " + id);
            return res.status(404).json({error: 'id not found'}).send();
        }
        if(assignment.createdBy!=req.account.email){
            logger.warn("Forbidden delete action in deleteAssignment function by User: " , req.account.email);
            return res.status(403).json({error: 'Forbidden'}).send();
        }
        await assignment.destroy();
        logger.info("Assignment deleted in deleteAssignment function for assignment id: " + id);
        return res.status(204).send();
    }
    catch(error){
        logger.error(`Error in deleteAssignment function: ${error.message}`);
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
        if(!Number.isInteger(points) || !Number.isInteger(num_of_attempts)){
            logger.warn("Bad put request because of bad request body in updateAssignment function");
            return res.status(400).json({error: 'Bad Request'}).send();
        }
        if (!(typeof name === 'string' || name instanceof String)){
            logger.warn("Bad put request because of bad request body in updateAssignment function");
            return res.status(400).json({error: 'Bad Request'}).send();
        }
        if(!checkDate(deadline)){
            logger.warn("Bad put request because of bad request body in updateAssignment function");
            return res.status(400).json({error: 'Bad Request'}).send();
        }
        if(!name || !points || !num_of_attempts || !deadline || Object.keys(req.body).length > 4 ){
            logger.warn("Bad put request because of bad request body in updateAssignment function");
            return res.status(400).json({error: 'Bad Request'}).send();
        }
        const assignment = await Assignments.findOne({where: {id: id}});
        if(!assignment){
            logger.warn("No assignment found in updateAssignment function with id: " + id);
            return res.status(404).json({error: 'id not found'}).send();
        }
        if(assignment.createdBy!=req.account.email){
            logger.warn("Forbidden delete action in updateAssignment function by User: " , req.account.email);
            return res.status(403).json({error: 'Forbidden'}).send();
        }
        assignment.name = name;
        assignment.points = points;
        assignment.num_of_attempts = num_of_attempts;
        assignment.deadline = deadline;
        await assignment.save();
        logger.info("Assignment updated in updateAssignment function for assignment id: " + id);
        return res.status(204).send(); 
    }
    catch(error){
        logger.error(`Error in updateAssignment function: ${error.message}`);
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
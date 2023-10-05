const sequelize = require('../util/config')
const Account = require('../models/Account')
const Assignments = require('../models/Assignments')

const getAllAssignments = async (req,res) => {
    try{
        if (req.body && Object.keys(req.body).length > 0){
            return res.status(400).send();
        }
        const allAssignments = await Assignments.findAll();
        return res.status(200).json(allAssignments).send();
    }
    catch(error){
        return res.status(400).json({error: 'Bad Request'}).send();
    }
}
const createAssignment = async (req,res) => {
    
    try{
        const name = req.body.name;
        const points = req.body.points;
        const num_of_attempts = req.body.num_of_attempts;
        const deadline = req.body.deadline;
        const createdBy = req.account.email;
        if(!name || !points || !num_of_attempts || !deadline || !createdBy){
            return res.status(400).json({error: 'Bad Request'}).send();
        }
        const new_assignment = await Assignments.create({
            name: name,
            points: points,
            num_of_attempts: num_of_attempts,
            deadline: deadline,
            createdBy: createdBy
        });
        return res.status(201).json(new_assignment).send();
    }
    catch(error){
        return res.status(400).json({error: 'Bad Request'}).send();
    }
}
const getAssignment = async (req,res) => {
    try{
        const id = req.params.id;
        if (req.body && Object.keys(req.body).length > 0){
            return res.status(400).send();
        }
        const assignment = await Assignments.findOne({where: {id: id}});
        if(!assignment){
            return res.status(404).json({error: 'id not found'}).send();
        }
        return res.status(200).json(assignment).send();
    }
    catch(error){
        return res.status(400).json({error: 'Bad Request'}).send();
    }
}
const deleteAssignment = async (req,res) => {
    try{
        const id = req.params.id;
        const assignment = await Assignments.findOne({where: {id: id}});
        if(!assignment){
            return res.status(404).json({error: 'id not found'}).send();
        }
        if(assignment.createdBy!=req.account.email){
            return res.status(403).json({error: 'Forbidden'}).send();
        }
        await assignment.destroy();
        return res.status(204).send()
    }
    catch(error){
        return res.status(400).json({error: 'Bad Request'}).send();
    }
}
const updateAssignment = async (req,res) => {
    try{
        const id = req.params.id;
        const name = req.body.name;
        const points = req.body.points;
        const num_of_attempts = req.body.num_of_attempts;
        const deadline = req.body.deadline;
        if(!name || !points || !num_of_attempts || !deadline ){
            return res.status(400).json({error: 'Bad Request'}).send();
        }
        const assignment = await Assignments.findOne({where: {id: id}});
        if(!assignment){
            return res.status(404).json({error: 'id not found'}).send();
        }
        if(assignment.createdBy!=req.account.email){
            return res.status(403).json({error: 'Forbidden'}).send();
        }
        assignment.name = name;
        assignment.points = points;
        assignment.num_of_attempts = num_of_attempts;
        assignment.deadline = deadline;
        await assignment.save();
        return res.status(204).send(); 
    }
    catch(error){
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
const Portfolio = require('../models/portfolio');
const {connectToDB, closeConnection} = require('../mongo');
const {ObjectId} = require("mongodb");
const mongoose = require("mongoose");

exports.getProfile = async(req, res)=> {
    try{
        const {userId} = req.body;
        const db = await connectToDB();
        const result = await db.collection('users').findOne({_id: userId});
        const portfolio = await db.collection('investorportfolios').findOne({userId: userId})
        console.log(result)
        await closeConnection();

        console.log()
        res.status(201).json({
            result,
            portfolio
        });
    } catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error'});
    }
}

exports.editUser = async (req, res) => {
    try {
        const updateUserData = req.body;
        const db = await connectToDB();
        const { _id } = updateUserData;
        delete updateUserData._id;
        const updatedUser = await db.collection('users').updateOne({_id: _id}, { $set: updateUserData });
        await closeConnection();
        res.status(200).json({
            updatedUser
        });
    } catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error'});
    }
}

exports.editPortfolio = async (req, res) => {
    try {
        const updatePortfolioData = req.body;
        const db = await connectToDB();
        const { _id } = updatePortfolioData;
        delete updatePortfolioData._id;
        console.log(_id, updatePortfolioData)
        const updatedPortfolio = await db.collection('investorportfolios').updateOne({_id: new ObjectId(_id)}, { $set: updatePortfolioData });
        await closeConnection();
        res.status(200).json({
            updatedPortfolio
        });
    } catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error'});
    }
}
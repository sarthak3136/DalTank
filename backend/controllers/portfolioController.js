const Portfolio = require('../models/portfolio');

exports.addPortfolio = async(req, res)=> {
    try{
        const {userId,investmentPreferences,industryExpertise,trackRecord,uploadedFile} = req.body;
        const rating = await Portfolio.create({
            userId,
            investmentPreferences,
            industryExpertise,
            trackRecord,
            uploadedFileData: uploadedFile,

        });
        res.status(201).json(rating);
    } catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error'});
    }
}

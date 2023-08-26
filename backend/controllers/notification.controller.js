const nodeMailer = require('nodemailer');
const {connectToDB, closeConnection} = require("../mongo");

exports.sendNotification = async (req, res) => {
    try{
        const db = await connectToDB();

    //     Fetch all the users email from the database whose role is Investor
        const users = await db.collection('users').find({role: "Investor"}).toArray();
        const emails = users.map(user => user.email);
        // Send email to all the investors
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tr335214@gmail.com',
                pass: "vhxolcbpjjpegerj"
            }
        });
        const subject = `New Idea Posted`
        const text =   `A new idea has been posted on the platform. Please visit the platform to view the idea.`
        const mailOptions = {
            from: 'tr335214@gmail.com',
            to: emails,
            subject: subject,
            text: text
        };

        await transporter.sendMail(mailOptions);
        await closeConnection();
        res.status(200).json({message: "Emails successfully sent to all the investors"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', errMessage: err });
    }
}
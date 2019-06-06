const nodemailer = require('nodemailer');
const { EMAIL, PASS } = require('../config');

const emailService = {
    checkEmailExist(db, email){
        return db('cactus_users')
                .where(email)
                .first()
                .then(e => !!e)
    },
    findUserID(db, email){
        return db('cactus_users')
                .where(email)
                .first()
                .select('id')
    },
    makeTempKey(db, id, email){
        return db
                .insert(id)
                .into('expire_keys')
                .returning('token')        
    },
    emailKey(id, email){
        const baseUrl = "www.something.com/emailreset/"+id
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: EMAIL,
              pass: PASS
            }
          });
        const mailOptions = {
            from: EMAIL,
            to: email,
            subject: "Your CACTUS HEAD password reset link",
            text: baseUrl
        }
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return false
            }
            return true
        })
    }
}

module.exports = emailService
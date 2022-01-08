const sgMail = require('@sendgrid/mail')

// const sendGridAPIKey = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: '10ankitkusahoo10@gmail.com',
//     from: '10ankitkusahoo10@gmail.com',
//     subject: 'This is my first generated mail',
//     text: 'Hope this mail gets to you.'
// })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: '10ankitkusahoo10@gmail.com',
        subject: 'Thanks for joining in!!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const goodByeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: '10ankitkusahoo10@gmail.com',
        subject: `Goodbye ${name}, Hope to see you soon`,
        text: 'Sad to see you go away. Please send us a review of your experience.'
    })
}

module.exports = {
    sendWelcomeEmail, goodByeEmail
}
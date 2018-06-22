const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const admin = require('firebase-admin');
admin.initializeApp();

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const stripe = require('stripe')(functions.config().stripe.testkey);

const cors = require('cors')({
    //origin: true
    origin: [
        "http://localhost:4000",
        "http://localhost:4000/",
        "https://coupost-7fc1b.firebaseapp.com/",
        "https://coupost-7fc1b.firebaseapp.com",
        "https://couposts.com/",
        "https://couposts.com"
    ],
    methods: ['GET','POST','PUT'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

exports.stripeCharge = functions.database
    .ref('/payments/{userId}/{paymentId}')
    .onWrite((event, context) => {

        const payment = event.after.val();
        const userId = context.params.userId;
        const paymentId = context.params.paymentId;

        console.log(payment, 'payment')

        if (!payment || payment.charge) return;

        return admin.database()
              .ref(`/users/${userId}`)
              .once('value')
              .then(snapshot => {
                  return snapshot.val();
               })
               .then(customer => {

                const amount = payment.amount;
                const idempotency_key = paymentId;  // prevent duplicate charges
                const source = payment.token.id;
                const currency = 'usd';
                const charge = {amount, currency, source};

                return stripe.charges.create(charge, { idempotency_key });

               })

               .then(charge => {
                   admin.database()
                        .ref(`/payments/${userId}/${paymentId}/charge`)
                        .set(charge)
                  })


});
  


exports.helloWorld = functions.https.onRequest((req, res) => {
    console.log('hello world')
    cors(req, res, () => {
        return res.send("Hello from Firebase!");
    });
});

exports.sendCode = functions.https.onRequest((req, res) => {

    return cors(req, res, () => {
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'stevemcorry@gmail.com',
                pass: functions.config().nodemailer.password
            }
        });
    
        let mailOptions = {
            from: '"Couposts Admin" <info@couposts.com>', 
            to: req.body.email, // list of receivers
            subject: "Couposts code", // Subject line
            text: "Couposts.com", // plain text body
            html: req.body.body // html body
        };
    
        transporter.sendMail(mailOptions).then(()=>{
            return res.status(200).send('This is working now ho')
        }).catch(()=>{
            return res.status(500).send('This is broke')
        })

    });

})
exports.sendConfirmation = functions.https.onRequest((req, res) => {

    return cors(req, res, () => {
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'stevemcorry@gmail.com',
                pass: functions.config().nodemailer.password
            }
        });
    
        let mailOptions = {
            from: '"Couposts Admin" <info@couposts.com>', 
            to: req.body.email, // list of receivers
            subject: "Coupost Confirmation", // Subject line
            text: "Couposts.com", // plain text body
            html: req.body.body // html body
        };
    
        transporter.sendMail(mailOptions).then(()=>{
            return res.status(200).send('Confirmation is working now')
        }).catch(()=>{
            return res.status(500).send('Confirmation is broke')
        })

    });

})
exports.sendDenial = functions.https.onRequest((req, res) => {

    return cors(req, res, () => {
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'stevemcorry@gmail.com',
                pass: functions.config().nodemailer.password
            }
        });
    
        let mailOptions = {
            from: '"Couposts Admin" <info@couposts.com>', 
            to: req.body.email, // list of receivers
            subject: "There was a problem.", // Subject line
            text: "Couposts.com", // plain text body
            html: req.body.body // html body
        };
    
        transporter.sendMail(mailOptions).then(()=>{
            return res.status(200).send('This is working now ho')
        }).catch(()=>{
            return res.status(500).send('This is broke')
        })

    });

})
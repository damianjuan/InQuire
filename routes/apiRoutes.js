const Router = require('express').Router;
const db = require("../models");
const passport = require("../config/passport");
const apiRoutes = Router();

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
apiRoutes.post("/signup", async (req, res) => {
    const signUpdata = db.User.create(req.body);
    res.json(signUpdata);
});
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
apiRoutes.post("/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json(req.body);
});
// Route for getting some data about our user to be used client side
apiRoutes.get("/userdata", (req, res) => {
    if (!req.user) {
        res.json({});
    } else {
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    };
});

//[post]
//1. create survey
apiRoutes.post('/create-survey', async (req, res) => {
    const dbSurveyName = await db.Survey.create({
        survey_name: req.body.survey_name,
    });
    const dbQuestionInfo = await db.Question.create({
        question_title: req.body.question_title,
        question_type: req.body.question_type,
        choices: req.body.choices
    });
    res.json(dbSurveyName);
    res.json(dbQuestionInfo);
});
//2. take survey
apiRoutes.post('/take-survey', async (req, res) => {
    const dbAnswer = await db.Answer.create({
        answer: req.body.answer,
        count: req.body.count
    });
    res.json(dbAnswer);
});

//[delete]
//1. delete survey

apiRoutes.delete('/delete/:id', async (req, res) => {
    const options = {
        where: {
            survey_uuid: req.params.id
        }
    };
    const delelteSurvey = await db.Survey.destroy(options);
    res.json(delelteSurvey);
});


//[get]
//1. get survey & question info for rendering take-survey page.
apiRoutes.get('/take-survey/:id', async (req, res) => {
    const options = {
        where: {
            survey_uuid: req.params.id
        },
        include: [db.Question]
    };
    const takeSurvey = await db.Survey.findAll(options);
    res.json(takeSurvey);
});

//2. get answer info for rendering results-survey page
apiRoutes.get('/results/:id', async (req, res) => {
    const options = {
        where: {
            survey_uuid: req.params.id
        },
        include: [db.Question, db.Answer]
    };
    const getResult = await db.Survey.findAll(options);
    res.json(getResult);
});



module.exports = apiRoutes;



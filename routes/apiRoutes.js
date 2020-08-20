const Router = require('express').Router;
const db = require('../models');
const passport = require('../config/passport');
const apiRoutes = Router();
const isAuthenticated = require('../config/middleware/isAuthenticated');

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
apiRoutes.post('/signup', async (req, res) => {
    const signUpdata = db.User.create(req.body);
    res.json(signUpdata);
});
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
apiRoutes.post('/login', passport.authenticate('local'), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json(req.body);

});

apiRoutes.get("/checkAuthentication", isAuthenticated, (req, res) => {
    const user = req.user ? req.user : null;
    res.status(200).json({
        user: user,
    });
});

apiRoutes.get('/logout', function (req, res) {
    req.logout();
    window.location.replace("/");
});

// Route for getting some data about our user to be used client side
apiRoutes.get('/userdata', (req, res) => {
    if (!req.user) {
        res.json({});
    } else {
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    };
});

// Routes for creating surveys

// This route creates a new survey using passed in survey_name and uuid
apiRoutes.post('/create-survey', async (req, res) => {
    const dbTitle = await db.Survey.create(req.body);
    res.json(dbTitle);
});

// This route creates any number of new survey questions using a passed in array containing multiple objects with
// question_title, question_type, and SurveyUuid, for relating it back to the survey it belongs to
apiRoutes.post('/create-survey-question', async (req, res) => {
    const dbQuestions = await db.Question.bulkCreate(req.body);
    res.json(dbQuestions);
});

// This route creates any number of new survey question answers using a passed in array containing multiple objects with
// answer and QuestionId, for relating it back to the question it belongs to
apiRoutes.post('/create-question-answer', async (req, res) => {
    const dbAnswers = await db.Answer.bulkCreate(req.body);
    res.json(dbAnswers);
});

// Routes for getting survey information

// This route takes in a survey Uuid, and returns ALL information related to that survey
// This includes the survey title as well as all questions and answers, including answer count
apiRoutes.get('/get-survey/:uuid', async (req, res) => {
    const survey = await db.Survey.findAll({
        where: {
            uuid: req.params.uuid
        },
        include: [{
            model: db.Question,
            include: db.Answer
        }]
    });
    res.send(survey);
});

// This route takes in a user ID number and returns all the names with associated uuids of surveys they have created
apiRoutes.get('/get-user-surveys/:userId', async (req, res) => {
    const surveyList = await db.Survey.findAll({
        attributes: [
            'survey_name',
            'uuid'
        ],
        where: {
            userId: req.params.userId
        }
    });
    res.send(surveyList);
});

// This route takes in a survey Uuid and returns that survey's title, all of that survey's question prompts, as well as all 
// answer choices with related answer counts related to each question
apiRoutes.get('/get-answer-count/:uuid', async (req, res) => {
    const answerList = await db.Survey.findAll({
        attributes: [
            'survey_name',
            'uuid'
        ],
        where: {
            uuid: req.params.uuid
        },
        include: [{
            model: db.Question,
            attributes: [
                'question_title',
                'question_type'
            ],
            include: [{
                model: db.Answer,
                attributes: [
                    'answer',
                    'count'
                ]
            }]
        }]
    });
    res.send(answerList);
});

// Routes for modifying survey information

// This put route takes in an array of question ID numbers, ex. [1, 3, 6], and increments the count value in those answer items by 1
apiRoutes.put('/increment-answers', async (req, res) => {
    req.body.map((ans) => {
        db.Answer.increment('count', {
            where: {
                id: ans
            }
        });
    });
    res.end();
});

//[delete]
//1. delete survey

apiRoutes.delete('/delete/:id', async (req, res) => {
    const options = {
        where: {
            uuid: req.params.id
        }
    };
    const deleteSurvey = await db.Survey.destroy(options);
    res.json(deleteSurvey);
});

module.exports = apiRoutes;

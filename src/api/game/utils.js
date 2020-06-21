const jwt = require('jsonwebtoken');

module.exports.authenticateToken = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, params) => {
        if (err) return res.sendStatus(403);
        req.params = params;
        next()
    })
};


module.exports.generateAccessToken = function generateAccessToken(params) {
    return jwt.sign(params, process.env.ACCESS_TOKEN_SECRET, {})

    // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
};


module.exports.getStatus = (passage) => {
    const availableChars = {
        girl: !passage.activities.girl.length,
        boy: !passage.activities.boy.length,
        virus: !passage.activities.virus.length,
    };

    let step = {};
    const story = passage.currentChar ? require(`./story/${passage.currentChar}`) : null;


    let activity = null;
    if(story){
        step = story.steps.find(step => step.id === passage.currentStep) || {};
        if(step.activity && step.activity.options){
            activity = {
                ...step.activity,
                options: step.activity.options.map(step => step.label)
            };
        }
    }



    return {
        currentStep: passage.currentStep,
        score: passage.score,
        availableChars,
        ...step,
        activity: activity||step.activity
    };
};
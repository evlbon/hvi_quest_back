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
    return jwt.sign(params, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30d'})

    // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
};


module.exports.getStatus = async (passage) => {
    const availableChars = {
        girl: passage.activities.girl.length?'finished':'available',
        boy: passage.activities.boy.length?'finished':passage.activities.girl.length?'available':'locked',
        virus: passage.activities.virus.length?'finished':passage.activities.boy.length?'available':'locked',
    };

    let step = {};
    const story = passage.currentChar ? require(`./story/${passage.currentChar}`) : null;

    if(passage.currentStep === "finish"){
        passage.finishTime = new Date();
        await passage.save()
    }


    let activity = null;
    if(story){
        step = story.steps.find(step => step.id === passage.currentStep) || {};
        if(step.activity&&step.activity.type === 'letterReading' ) {
            const letterActivity = passage.activities.girl.find(act => act.type === 'letter');
            const letter = letterActivity ? letterActivity.answer : 'нету письма(';
            activity = {
                ...step.activity,
                type: 'letterReading',
                text: letter,
            };
        }

        else if(step.activity && step.activity.options){
            activity = {
                ...step.activity,
                options: step.activity.options.map(step => step.label)
            };

        }
    }



    return {
        currentStep: passage.currentStep,
        score: passage.score,
        time: Math.round(((passage.finishTime || new Date()) - passage.startTime)/1000),
        availableChars,
        ...step,
        activity: activity||step.activity
    };
};
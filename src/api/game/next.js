const {Router} = require('express');
const {User, Player, Passage} = require('../../models');
const utils = require('./utils');

const router = Router();


router.post('/api/game/next/',utils.authenticateToken, async (req, res) => {
    try {
        const {answer} = req.body;
        const {currentPass} = req.params;
        const passage = await Passage.findOne({_id: currentPass});

        // console.log(passage)
        if(!passage.currentChar || !passage.currentStep)
            res.status(400).send();

        if(passage.currentStep === "0")
            return res.json(utils.getStatus(passage));


        const story = require(`./story/${passage.currentChar}`);


        const step = story.steps.find(step => step.id === passage.currentStep);


        console.log(step)


        switch (step.activity.type) {
            case "dialog":{
                passage.currentStep = step.nextStep;
                break;
            }

            case "radio":{
                const ans = step.activity.options.find(ans => ans.label === answer );

                console.log(step.activity.options)
                console.log(step)

                passage.score += ans.weight;
                passage.currentStep = ans.nextStep;
                break;
            }

            case "checklist":{
                answer.forEach(answer => {
                    const ans = step.activity.options.find(ans => ans.label === answer ) || {weight: 0};
                    passage.score += ans.weight;
                });

                passage.currentStep = step.nextStep;
            }
        }



        await passage.save();

        return res.json(utils.getStatus(passage));

    } catch (e) {
        console.log(e);
        res.status(500).send()
    }

});


module.exports = router;
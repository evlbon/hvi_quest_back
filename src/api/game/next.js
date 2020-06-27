const {Router} = require('express');
const {User, Player, Passage} = require('../../models');
const utils = require('./utils');

const router = Router();


router.post('/api/game/next/', utils.authenticateToken, async (req, res) => {
    try {
        const {answer} = req.body;
        const {currentPass} = req.params;
        const passage = await Passage.findOne({_id: currentPass});

        // console.log(passage)
        // if (!passage.currentChar || !passage.currentStep)
        //     return res.status(400).send();


        if (passage.currentStep === "chooseScreen")
            return res.json(await utils.getStatus(passage));

        if (passage.currentStep === "captions")
            return res.json(await utils.getStatus(passage));

        if (passage.currentStep === "finish"){
            passage.currentStep = "captions";
            console.log(passage.finishTime)
            await passage.save();
            return res.json(await utils.getStatus(passage));
        }

        if (passage.currentStep === "start"){
            passage.currentStep = "chooseScreen";
            await passage.save();
            return res.json(await utils.getStatus(passage));
        }

        console.log(answer)


        const story = require(`./story/${passage.currentChar}`);


        const step = story.steps.find(step => step.id === passage.currentStep);

        // console.log(step)


        switch (step.activity.type) {
            case "dialog": {
                passage.currentStep = step.nextStep;
                break;
            }

            case "radio": {
                const ans = step.activity.options.find(ans => ans.label === answer);

                passage.activities[passage.currentChar].push({
                    step: passage.currentStep,
                    answer
                });

                passage.score += ans.weight;
                passage.currentStep = ans.nextStep;
                break;
            }

            case 'checklist': {
                answer.forEach(answer => {
                    const ans = step.activity.options.find(ans => ans.label === answer) || {weight: 0};
                    passage.score += ans.weight;
                });

                passage.activities[passage.currentChar].push({
                    step: passage.currentStep,
                    answer
                });

                console.log(step)

                passage.currentStep = step.nextStep;
                break;
            }

            case 'timechoice': {
                const ans = step.activity.options.find(ans => ans.label === answer);

                passage.activities[passage.currentChar].push({
                    step: passage.currentStep,
                    answer
                });

                console.log(ans, answer)
                passage.score += ans.weight;
                passage.currentStep = ans.nextStep;
                break;
            }

            case 'letter': {
                passage.activities[passage.currentChar].push({
                    type: 'letter',
                    step: passage.currentStep,
                    answer
                });

                passage.currentStep = step.nextStep;
                break;
            }

            case 'letterReading': {
                passage.currentStep = step.nextStep;
                break;
            }

            case null:{
                passage.currentStep = step.nextStep;
                break;
            }
        }


        await passage.save();

        return res.json(await utils.getStatus(passage));

    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
});


module.exports = router;
const {Router} = require('express');
const {User, Player, Passage} = require('../../models');
const utils = require('./utils');

const router = Router();

router.post('/api/game/reset/', utils.authenticateToken, async (req, res) => {
    try {
        const {currentPass, playerId} = req.params;

        const passage = await Passage.findOne({_id: currentPass});

        passage.currentChar = null;
        passage.currentStep = "start";
        passage.score = 0;
        passage.startTime = new Date();
        passage.activities = {
            girl:[],
            boy:[],
            virus:[]
        };

        await passage.save();

        return res.json(await utils.getStatus(passage));
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
});


module.exports = router;
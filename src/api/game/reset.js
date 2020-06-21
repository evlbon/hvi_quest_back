const {Router} = require('express');
const {User, Player, Passage} = require('../../models');
const utils = require('./utils');

const router = Router();

router.post('/api/game/reset/', utils.authenticateToken, async (req, res) => {
    try {
        const {currentPass, playerId} = req.params;

        const passage = await Passage.findOne({_id: currentPass});

        passage.currentChar = null;
        passage.currentStep = "0";
        passage.score = 0;
        passage.activities = {
            girl:[],
            boy:[],
            virus:[]
        };

        await passage.save();

        return res.json(utils.getStatus(passage));
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
});


module.exports = router;
const {Router} = require('express');
const {User, Player, Passage} = require('../../models');
const utils = require('./utils');

const router = Router();

router.get('/api/game/status/',utils.authenticateToken, async (req, res) => {
    try {
        const {currentPass} = req.params;

        const pass = await Passage.findOne({_id: currentPass});


        const availableChars = {
            healthy: !pass.activities.healthy.length,
            sick: !pass.activities.sick.length,
            virus: !pass.activities.virus.length,
        };

        return res.json({
            lastStep: pass.lastStep,
            score: pass.score,
            currentChar: pass.currentChar || null,
            availableChars
        });

    } catch (e) {
        console.log(e);
        res.status(500).send()
    }

});


module.exports = router;
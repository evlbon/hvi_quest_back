const {Router} = require('express');
const {User, Player, Passage} = require('../../models');
const utils = require('./utils');

const router = Router();

router.get('/api/game/status/',utils.authenticateToken, async (req, res) => {
    try {
        const {currentPass} = req.params;

        const pass = await Passage.findOne({_id: currentPass});

        return res.json(await utils.getStatus(pass));

    } catch (e) {
        console.log(e);
        res.status(500).send()
    }

});


module.exports = router;
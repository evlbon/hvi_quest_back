const {Router} = require('express');
const {User, Player, Passage} = require('../../models');
const utils = require('./utils');

const router = Router();

router.post('/api/game/chooseChar/',utils.authenticateToken, async (req, res) => {
    try {
        const char = req.body.charName;
        const {currentPass} = req.params;

        if(['girl','boy','virus'].indexOf(char) === -1)
            res.status(400).send();


        const pass = await Passage.findOne({_id: currentPass});

        pass.currentChar = char;
        pass.currentStep = 1;

        await pass.save();

        return res.json(utils.getStatus(pass));
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
});


module.exports = router;
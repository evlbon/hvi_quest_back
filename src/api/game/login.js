const {Router} = require('express');
const {User, Player, Passage} = require('../../models');
const utils = require('./utils');

const router = Router();

router.post('/api/game/login/', async (req, res) => {
    try {
        const {phone, code} = req.body;
        const user = await User.findOne({phone});

        if(!user)
            return res.status(404).send("Not Found");

        console.log(code, user.code)
        if(code !== user.code)
            return res.status(400).send();

        let player = await Player.findOne({userId: user._id.toString()});

        if(!player){
            player = new Player({userId: user._id.toString()});
            const passage = new Passage({playerId: player._id.toString()});
            player.firstPass = passage._id.toString();
            player.currentPass = passage._id.toString();
            await passage.save();
            await player.save();
        }

        return res.send(utils.generateAccessToken({
            userId: user._id,
            playerId: player._id,
            currentPass: player.currentPass
        }));

    } catch (e) {
        console.log(e);
        res.status(500).send()
    }

});


module.exports = router;
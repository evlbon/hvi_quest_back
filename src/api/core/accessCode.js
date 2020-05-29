const {Router} = require('express');
const axios = require('axios');
const {User} = require('../../models');

const router = Router();

router.post('/api/core/accessCode/', async (req, res) => {
    try {
        const {code, redirectURL} = req.body;
        const clientId = '7484844';
        const clientSecret = '4IZoq9xSaqtmuycMBzd2';
        let url = `https://oauth.vk.com/access_token?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectURL}&code=${code}`;

        const response = (await axios.get(url)).data;

        url =  `https://api.vk.com/method/users.get?user_ids=${response.user_id}&fields=bdate&access_token=${response.access_token}&v=5.107`
        const vkUser = (await axios.get(url)).data.response[0];

        await User.deleteMany({vkId: vkUser.id});

        if(await User.findOne({vkId: vkUser.id}))
            return res.status(403).send('User already exist');

        const user = new User({vkId: vkUser.id, firstName:vkUser.first_name, lastName:vkUser.last_name, birthDate: vkUser.bdate});

        await user.save();




        console.log(user);


        return res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }

});


module.exports = router;
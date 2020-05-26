const {Router} = require('express');
const axios = require('axios');

const router = Router();

router.post('/api/core/accessCode/', async (req, res) => {
    try {
        const {code, redirectURL} = req.body;
        const clientId = '7484844';
        const clientSecret = '4IZoq9xSaqtmuycMBzd2';
        const url = `https://oauth.vk.com/access_token?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectURL}&code=${code}`;

        const response = (await axios.get(url)).data;


        console.log(response, req.body);


        return res.send('done');
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }

});


module.exports = router;
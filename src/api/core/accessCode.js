const {Router} = require('express');

const router = Router();

router.get('/api/core/accessCode/', async (req, res)=>{
    try {
        const {code} = req.body;

        console.log(code);


        return res.send('done');
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }

});


module.exports = router;
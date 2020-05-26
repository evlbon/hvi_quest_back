const {Router} = require('express');

const router = Router();

router.get('/api/core/getDocument/', async (req, res)=>{

    res.send("Hello")

});


module.exports = router;
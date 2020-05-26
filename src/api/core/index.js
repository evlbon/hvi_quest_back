const {Router} = require('express');
const router = Router();

router.use(require('./accessCode'));

module.exports = router;
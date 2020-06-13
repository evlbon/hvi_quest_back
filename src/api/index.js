const {Router} = require('express');
const router = Router();

router.use(require('./core'));
router.use(require('./game'));

module.exports = router;
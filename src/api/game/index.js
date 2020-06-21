const {Router} = require('express');
const router = Router();

router.use(require('./login'));
router.use(require('./status'));

router.use(require('./chooseChar'));
router.use(require('./reset'));
router.use(require('./next'));


module.exports = router;

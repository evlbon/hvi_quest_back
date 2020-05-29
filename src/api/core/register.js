const {Router} = require('express');
const {User} = require('../../models');

const router = Router();

router.post('/api/core/register/', async (req, res) => {
    try {
        const {_id, firstName, lastName, city, school, classroom, phone} = req.body;

        if(!firstName || !lastName || !city || !school || !classroom || !phone)
            return res.status(400).send("Some fields were missed");

        if(await User.findOne({phone}))
            return res.status(403).send('User already exist');


        if(_id){
            await User.updateOne({_id},{$set:{firstName, lastName, city, school, classroom, phone}});

        }
        else {
            const user = new User({firstName, lastName, city, school, classroom, phone});
            await user.save()
        }

        console.log('done');
        return res.send("Success");
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }

});


module.exports = router;
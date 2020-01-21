const bcrypt = require('bcryptjs');

module.exports = {
    login: async(req, res) => {
        const {email, password} = req.body,
              db = req.app.get('db');

        let user = await db.auth.check_user({email});
        if(!user[0]){
            return res.status(400).send('Email not found')
        }
        let authenticated = bcrypt.compareSync(password, user[0].password);
        if(!authenticated){
            return res.status(400).send('Incorrect password')
        }
        delete user[0].password;
        req.session.user = user[0];
        res.status(202).send(req.session.user);
    },
    register: async(req, res) => {
        const {username, email, password} = req.body,
              db = req.app.get('db');

        let user = await db.auth.check_user({email});
        if(user[0]){
            return res.status(400).send('Email already in use')
        }
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let newUser = await db.auth.register_user({username, email, password: hash});
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.status(200).send('No user on session')
        }
    }
}
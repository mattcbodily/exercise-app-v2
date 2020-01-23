module.exports = {
    getUserBattles: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.battle.get_user_battles({id: +id})
        .then(battles => res.status(200).send(battles))
        .catch(err => res.status(500).send(err));
    },
    getSingleBattle: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.battle.get_single_battle({id: +id})
        .then(battle => res.status(200).send(battle))
        .catch(err => res.status(500).send(err));
    },
    getContestants: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.battle.get_contestants({id: +id})
        .then(contestants => res.status(200).send(contestants))
        .catch(err => res.status(200).send(err));
    },
    searchUsers: (req, res) => {
        const db = req.app.get('db');

        db.battle.search_users()
        .then(users => res.status(200).send(users))
        .catch(err => res.status(500).send(err));
    },
    createBattle: async(req, res) => {
        const {id} = req.params,
              {battleName, battleType, battleDuration, challenger} = req.body,
              db = req.app.get('db');

        let battleId = await db.battle.create_battle({battleName, battleType, battleDuration});
        db.battle.user_battle_join({battleId: battleId[0].battle_id, id, challenger})
        .then(data => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    },
    acceptBattle: (req, res) => {
        const {id} = req.params,
              {battleId} = req.body,
              db = req.app.get('db');

        db.battle.accept_battle({battleId, id: +id})
        .then(data => res.sendStatus(200))
        .catch(err => console.log(err));
    },
    declineBattle: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.battle.decline_battle({id: +id})
        .then(data => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    }
}
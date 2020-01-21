module.exports = {
    getUserBattles: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.battle.get_user_battles({id})
        .then(battles => res.status(200).send(battles))
        .catch(err => res.status(500).send(err));
    },
    createBattle: async(req, res) => {
        const {id} = req.params,
              {battleName, battleType, battleDuration} = req.body,
              db = req.app.get('db');

        let battleId = await db.battle.create_battle({battleName, battleType, battleDuration});
        console.log(battleId)
        db.battle.user_battle_join({battleId, id})
        .then(data => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    },
    acceptBattle: (req, res) => {
        const {id} = req.params,
              {battleId} = req.body,
              db = req.app.get('db');

        db.battle.accept_battle({battleId});

        db.battle.user_battle_join({battleId, id})
        .then(data => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    }
}
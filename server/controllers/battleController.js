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
    getContestants: async(req, res) => {
        const {id, type} = req.params,
              db = req.app.get('db');

        let contestants = await db.battle.get_contestants({id: +id});
        let distanceOne = await db.workout.get_workout_by_type({id: contestants[0].user_id, type});
        let distanceTwo = await db.workout.get_workout_by_type({id: contestants[1].user_id, type});

        contestants[0].distance = distanceOne[0].sum !== null ? distanceOne[0].sum : 0;
        contestants[1].distance = distanceTwo[0].sum !== null ? distanceTwo[0].sum : 0;

        res.status(200).send(contestants);
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
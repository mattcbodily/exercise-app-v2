module.exports = {
    getWorkoutByType: (req, res) => {
        const {id, type} = req.params,
              db = req.app.get('db');

        db.workout.get_workout_by_type({id: +id, type})
        .then(workouts => res.status(200).send(workouts))
        .catch(err => res.status(500).send(err))
    },
    addWorkout: (req, res) => {
        const {id} = req.params,
              {workoutDate, workoutName, workoutType, workoutDistance} = req.body,
              db = req.app.get('db');

        db.workout.add_workout({workoutDate, workoutName, workoutType, workoutDistance: +workoutDistance, id: +id})
        .then(workout => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    }
}
select sum(workout_distance) from workout
where user_id = ${id}
and workout_type = ${type};
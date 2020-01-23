select u.user_id, u.username, u.email from users u
join users_battle_join ub on u.user_id = ub.user_id
where ub.battle_id = ${id};
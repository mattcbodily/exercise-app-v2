select b.battle_id, b.battle_name, b.battle_type, b.battle_duration, ub.accepted from battle b
join users_battle_join ub on b.battle_id = ub.battle_id
where ub.user_id = ${id};
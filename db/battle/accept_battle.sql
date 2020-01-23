update users_battle_join
set accepted = true
where battle_id = ${battleId}
and user_id = ${id};
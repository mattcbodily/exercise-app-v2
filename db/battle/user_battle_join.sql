insert into users_battle_join (
    battle_id,
    user_id,
    accepted
) values (
    ${battleId},
    ${id},
    true
);

insert into users_battle_join (
    battle_id,
    user_id,
    accepted
) values (
    ${battleId},
    ${challenger},
    false
);
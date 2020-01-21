insert into battle (
    battle_name,
    battle_type,
    battle_duration,
    accepted
) values (
    ${battleName},
    ${battleType},
    ${battleDuration},
    false
)
returning battle_id;
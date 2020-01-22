insert into battle (
    battle_name,
    battle_type,
    battle_duration
) values (
    ${battleName},
    ${battleType},
    ${battleDuration}
)
returning battle_id;
create table if not exists users (
    user_id serial primary key,
    username varchar(30),
    email varchar(150),
    password varchar(250),
    user_image varchar(250)
);

create table if not exists battle (
    battle_id serial primary key,
    battle_name varchar(30),
    battle_type varchar(30),
    battle_duration varchar(30),
);

create table if not exists users_battle_join (
    join_id serial primary key,
    battle_id int references battle(battle_id),
    user_id int references users(user_id)
    accepted boolean
);

create table if not exists workout (
    workout_id serial primary key,
    workout_date varchar(30),
    workout_name varchar(50),
    workout_type varchar(30),
    workout_distance decimal
    user_id int references users(user_id)
);
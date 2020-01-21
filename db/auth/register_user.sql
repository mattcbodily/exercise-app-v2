insert into users (
    username,
    email,
    password
) values (
    ${username},
    ${email},
    ${password}
)
returning username, email;
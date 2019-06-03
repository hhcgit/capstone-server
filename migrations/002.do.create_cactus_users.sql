CREATE TABLE cactus_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT now(),
  email TEXT NOT NULL UNIQUE,
  email_token TEXT
);


